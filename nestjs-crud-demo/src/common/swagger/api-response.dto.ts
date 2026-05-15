import { applyDecorators, Type } from '@nestjs/common';
import {
  ApiExtraModels,
  ApiOkResponse,
  ApiProperty,
  ApiResponse,
  getSchemaPath,
} from '@nestjs/swagger';

/**
 * Generic success response wrapper — mirrors ResponseInterceptor output:
 * { success: true, message: string, data: T }
 */
export class ApiSuccessResponse<T = unknown> {
  @ApiProperty({ example: true, description: 'Whether the request succeeded' })
  success: boolean;

  @ApiProperty({ example: 'Success', description: 'Human-readable message' })
  message: string;

  @ApiProperty({ description: 'Response payload' })
  data: T;
}

/**
 * Error response shape — mirrors AllExceptionsFilter output:
 * { success: false, statusCode, message, errorCode, timestamp, path }
 */
export class ApiErrorResponse {
  @ApiProperty({ example: false })
  success: boolean;

  @ApiProperty({ description: 'Error message' })
  message: string;
}

/**
 * Custom decorator factory to wrap any DTO in the standard success response for Swagger.
 * Usage: @ApiOkResponseWrapped(ProductDataDto) or @ApiOkResponseWrapped(ProductDataDto, true) for arrays
 */
export const ApiOkResponseWrapped = <TModel extends Type<any>>(model: TModel, isArray = false) => {
  return applyDecorators(
    ApiExtraModels(ApiSuccessResponse, model),
    ApiOkResponse({
      description: isArray ? 'Returns an array of records' : 'Returns a single record',
      schema: getWrappedSchema(model, isArray),
    }),
  );
};

// A better way is a dedicated function that returns the schema
export const getWrappedSchema = (model: Type<any>, isArray = false) => {
  return {
    allOf: [
      { $ref: getSchemaPath(ApiSuccessResponse) },
      {
        properties: {
          data: isArray
            ? { type: 'array', items: { $ref: getSchemaPath(model) } }
            : { $ref: getSchemaPath(model) },
        },
      },
    ],
  };
};

/**
 * Custom decorator factory to document error responses with specific examples.
 * Usage: @ApiErrorResponseWrapped(HttpStatus.NOT_FOUND, 'User not found', 'User not found.')
 */
export const ApiErrorResponseWrapped = (
  status: number,
  description: string,
  messageExample: string,
) => {
  return applyDecorators(
    ApiExtraModels(ApiErrorResponse),
    ApiResponse({
      status,
      description,
      schema: {
        allOf: [
          { $ref: getSchemaPath(ApiErrorResponse) },
          {
            properties: {
              message: { type: 'string', example: messageExample },
            },
          },
        ],
      },
    }),
  );
};
