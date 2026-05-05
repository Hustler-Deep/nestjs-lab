export interface CustomExceptionResponse {
  message?: string;
  errorCode?: string | number;
  [key: string]: any;
}

export interface ResponseFormat<T> {
  success: boolean;
  message: string;
  data: T | null;
}
