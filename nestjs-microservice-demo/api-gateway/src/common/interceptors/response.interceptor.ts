import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import {
  Messages,
  messages,
  StandardSuccessResponse,
} from '@nestjs/shared-lib';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

type ResponseShape<T> =
  | { message?: Messages; data: T }
  | { message?: Messages }
  | T;

@Injectable()
export class ResponseInterceptor<T>
  implements NestInterceptor<T, StandardSuccessResponse<T>>
{
  intercept(
    context: ExecutionContext,
    next: CallHandler<T>,
  ): Observable<StandardSuccessResponse<T>> {
    return next.handle().pipe(
      map((originalData: ResponseShape<T>): StandardSuccessResponse<T> => {
        let message: Messages = messages.SUCCESS;
        let data: T | undefined;

        if (
          typeof originalData === 'object' &&
          originalData !== null &&
          'data' in originalData
        ) {
          const typed = originalData as { message?: Messages; data: T };
          message = typed.message ?? messages.SUCCESS;
          data = typed.data;
        } else if (
          typeof originalData === 'object' &&
          originalData !== null &&
          'message' in originalData &&
          Object.keys(originalData).length === 1
        ) {
          const typed = originalData as { message?: Messages };
          message = typed.message ?? messages.SUCCESS;
          data = undefined;
        } else {
          data = originalData as T;
        }

        const response: StandardSuccessResponse<T> = {
          success: true,
          message,
        };

        if (typeof data !== 'undefined') response.data = data;

        return response;
      }),
    );
  }
}
