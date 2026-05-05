export interface CustomExceptionResponse {
  message?: string;
  errorCode?: string | number;
  [key: string]: any;
}

export interface RpcError {
  statusCode?: number;
  message?: string | string[];
}

export interface StandardSuccessResponse<T> {
  success: true;
  message: string;
  data?: T;
}