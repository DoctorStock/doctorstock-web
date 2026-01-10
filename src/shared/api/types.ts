export interface NetworkError {
  code: string;
  message: string;
}

export interface ErrorResponse {
  success: false;
  error: NetworkError;
}

export interface BaseResponse<T> {
  success: string;
  data?: T;
}
