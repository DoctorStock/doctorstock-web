import axios, { AxiosError } from 'axios';
import type {
  AxiosInstance,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from 'axios';
import { AUTH_STORAGE_KEYS } from '@/shared/config/auth';
import type { ErrorResponse } from './types';
import { errorHandlers, UNKNOWN_ERROR, logError } from './errorHandlers';

const BASE_URL = import.meta.env.DEV

  ? '/api'  // 개발 환경: Vite 프록시 사용
  : import.meta.env.BACKEND_API_URL  // 프로덕션: 환경변수에서 가져옴


export const apiClient: AxiosInstance = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
  headers: { 'Content-Type': 'application/json' },
});

apiClient.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const accessToken = localStorage.getItem(AUTH_STORAGE_KEYS.ACCESS_TOKEN);
    
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }

    return config;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  },
);

apiClient.interceptors.response.use(
  (response: AxiosResponse) => {
    return response;
  },
  async (error: AxiosError<ErrorResponse>) => {
    const response = error.response;

    if (!response) {
      return Promise.reject(error);
    }

    const errorResponse: ErrorResponse | undefined = response.data;
    const errorData = errorResponse?.error;
    const status = response.status;

    const handler = errorHandlers[status];
    if (handler) {
      handler(errorData);
    } else {
      logError(errorData, `${UNKNOWN_ERROR.message}: ${status}`, UNKNOWN_ERROR.code);
    }

    return Promise.reject(error);
  },
);
