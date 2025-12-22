// 외부
import { AxiosError, AxiosRequestConfig, AxiosResponse, InternalAxiosRequestConfig } from 'axios';

// 내부 모듈
import { apiClient } from './axios';
import { AUTH_STORAGE_KEYS } from '../auth';
import { ErrorResponse } from '../api';
import { errorHandlers, UNKNOWN_ERROR, logError } from './errorHandlers';

// ===== 내부 함수 =====
// Request Interceptor 설정
const configRequestInterceptor = (): void => {
  apiClient.interceptors.request.use((config: InternalAxiosRequestConfig) => {
    const accessToken = localStorage.getItem(AUTH_STORAGE_KEYS.ACCESS_TOKEN);

    // 토큰이 존재 여부
    if (accessToken) {
      config.headers = config.headers || {}; // undefined일 수 있으므로 기본값 설정
      config.headers.Authorization = `Bearer ${accessToken}`;
    }

    return config;
  }, (error: AxiosError) => {
    return Promise.reject(error);
  });
};

// Response Interceptor 설정
const configResponseInterceptor = (): void => {
  apiClient.interceptors.response.use(
    (response: AxiosResponse) => {
      return response;
    },
    async (error: AxiosError<ErrorResponse>) => {
      const response = error.response;

      // 응답이 없는 경우
      if (!response) {
        console.error('네트워크 오류 또는 서버에 연결할 수 없습니다.');
        return Promise.reject(error);
      }

      const errorResponse: ErrorResponse | undefined = response.data;
      const errorData = errorResponse?.error; // 에러 정보
      const status = response.status; // 상태 코드

      const handler = errorHandlers[status];
      if (handler) {
        handler(errorData);
      } else { // 알 수 없는 에러
        logError(errorData, `${UNKNOWN_ERROR.message}: ${status}`, UNKNOWN_ERROR.code);
      }

      return Promise.reject(error);
    }
  );
};

// ===== Export =====
// 앱 시작 시 한 번 호출시, 모든 API 요청에 인터셉터가 적용
export const configAxiosInterceptor = (): void => {
  configRequestInterceptor(); // Request
  configResponseInterceptor(); // Response
};
