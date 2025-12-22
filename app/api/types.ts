export interface NetworkError {
  code: string;
  message: string;
}

export interface ErrorResponse {
  success: false;
  error: NetworkError;
}

// 성공 - Base Response 
export interface BaseResponse<T> {
  message: string;
  code: string;
  data?: T;
}

