import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { CustomExceptionResponse, messages } from '@nestjs/shared-lib';
import { Response } from 'express';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    let status = HttpStatus.INTERNAL_SERVER_ERROR;
    let message: string = messages.INTERNAL_SERVER_ERROR;
    let errorCode: string | number | null = null;

    if (exception instanceof HttpException) {
      status = exception.getStatus();
      const res = exception.getResponse();

      if (typeof res === 'string') {
        message = res;
      } else if (typeof res === 'object' && res !== null) {
        const resObject = res as CustomExceptionResponse;
        message = resObject.message ?? exception.message;
        errorCode = resObject.errorCode ?? null;
      } else {
        message = exception.message;
      }
    } else if (
      typeof exception === 'object' &&
      exception !== null &&
      ('code' in exception || 'message' in exception)
    ) {
      const error = exception as { code?: string; message?: string };
      if (error.code === 'ER_DUP_ENTRY' || error.code === '23505') {
        status = HttpStatus.CONFLICT;
        message = messages.DUPLICATE_EMAIL;
        errorCode = error.code;
      } else if (error.message) {
        message = error.message;
      }
    }

    response.status(status).json({
      success: false,
      statusCode: status,
      message,
      errorCode,
    });
  }
}
