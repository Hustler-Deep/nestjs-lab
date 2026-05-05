import {
  BadRequestException,
  CallHandler,
  ExecutionContext,
  ForbiddenException,
  HttpException,
  Injectable,
  InternalServerErrorException,
  NestInterceptor,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { Observable, catchError, throwError } from 'rxjs';
import { RpcError } from '@nestjs/shared-lib';

function isRpcError(obj: unknown): obj is RpcError {
  return (
    typeof obj === 'object' &&
    obj !== null &&
    ('message' in obj || 'statusCode' in obj)
  );
}

@Injectable()
export class RpcExceptionInterceptor implements NestInterceptor {
  intercept(_: ExecutionContext, next: CallHandler): Observable<unknown> {
    return next.handle().pipe(
      catchError((err: unknown) => {
        console.log('ErrorL::::::::', err);

        if (err instanceof HttpException) {
          return throwError(() => err);
        }

        if (isRpcError(err)) {
          const { statusCode, message } = err;
          switch (statusCode) {
            case 400:
              return throwError(() => new BadRequestException(message));
            case 401:
              return throwError(() => new UnauthorizedException(message));
            case 403:
              return throwError(() => new ForbiddenException(message));
            case 404:
              return throwError(() => new NotFoundException(message));
            default:
              return throwError(
                () => new InternalServerErrorException(message),
              );
          }
        }

        return throwError(
          () => new InternalServerErrorException('Unexpected error'),
        );
      }),
    );
  }
}
