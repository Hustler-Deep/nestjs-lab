export interface CustomExceptionResponse {
  success: boolean;
  message: string;
  [key: string]: any;
}

export interface ResponseFormat<T> {
  success: boolean;
  message: string;
  data: T | null;
}
