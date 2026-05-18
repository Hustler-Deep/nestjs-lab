import { applyDecorators, Type } from '@nestjs/common';
import {
  ApiExtraModels,
  ApiOkResponse,
  ApiProperty,
  ApiResponse,
  getSchemaPath,
} from '@nestjs/swagger';

// ── Success wrapper (matches ResponseInterceptor output) ────────────
export class ApiSuccessResponse<T = unknown> {
  @ApiProperty({ example: true, description: 'Whether the request succeeded' })
  declare success: boolean;

  @ApiProperty({ example: 'Success', description: 'Human-readable message' })
  declare message: string;

  @ApiProperty({ description: 'Response payload' })
  declare data: T;
}

// ── Error wrapper (matches AllExceptionsFilter output) ──────────────
export class ApiErrorResponse {
  @ApiProperty({ example: false })
  declare success: boolean;

  @ApiProperty({ example: 400 })
  declare statusCode: number;

  @ApiProperty({ description: 'Error message' })
  declare message: string;

  @ApiProperty({ example: null, nullable: true })
  declare errorCode: string | number | null;
}

// ── Message-only success (no data field — e.g. delete) ─────────────
export class ApiMessageOnlyResponse {
  @ApiProperty({ example: true })
  declare success: boolean;

  @ApiProperty({ example: 'Operation completed successfully' })
  declare message: string;
}

// ── Decorator: wrap a DTO in standard success shape ────────────────
export const ApiOkResponseWrapped = <TModel extends Type<any>>(
  model: TModel,
  isArray = false,
) => {
  return applyDecorators(
    ApiExtraModels(ApiSuccessResponse, model),
    ApiOkResponse({
      description: isArray
        ? 'Returns an array of records'
        : 'Returns a single record',
      schema: {
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
      },
    }),
  );
};

// ── Decorator: message-only success (no data) ──────────────────────
export const ApiOkMessageOnly = (messageExample: string) => {
  return applyDecorators(
    ApiExtraModels(ApiMessageOnlyResponse),
    ApiOkResponse({
      description: 'Operation completed successfully (no data payload)',
      schema: {
        allOf: [
          { $ref: getSchemaPath(ApiMessageOnlyResponse) },
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

// ── Decorator: error response with specific example ────────────────
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
              statusCode: { type: 'number', example: status },
              message: { type: 'string', example: messageExample },
            },
          },
        ],
      },
    }),
  );
};
