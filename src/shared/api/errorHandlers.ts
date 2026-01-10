import type { NetworkError } from '@/shared/api/types';
import { AUTH_STORAGE_KEYS } from '@/shared/config/auth';

const ERROR_CONFIG = {
  401: { code: 'AUTH_ERROR', message: '인증이 만료되었습니다. 다시 로그인해주세요' },
  403: { code: 'FORBIDDEN', message: '접근 권한이 없습니다' },
  404: { code: 'NOT_FOUND', message: '요청한 리소스를 찾을 수 없습니다' },
  500: { code: 'SERVER_ERROR', message: '서버 오류가 발생했습니다' },
} as const;

export const UNKNOWN_ERROR = { code: 'UNKNOWN_ERROR', message: '에러가 발생했습니다' } as const;

const createErrorHandler = (status: number) => {
  return (errorData: NetworkError | undefined) => {
    const config = ERROR_CONFIG[status as keyof typeof ERROR_CONFIG];
    if (config) {
      logError(errorData, config.message, config.code);
    }
  };
};

export const logError = (
  _errorData: NetworkError | undefined,
  _defaultMessage: string,
  _defaultCode: string
): void => {
  // TODO: 에러 로깅 처리
  // 팝업으로 에러 메시지 표시
};

export const errorHandlers: Record<number, (errorData: NetworkError | undefined) => void> = {
  401: (errorData) => {
    localStorage.removeItem(AUTH_STORAGE_KEYS.ACCESS_TOKEN);
    localStorage.removeItem(AUTH_STORAGE_KEYS.REFRESH_TOKEN);
    if (typeof window !== 'undefined') {
      window.location.href = '/pages/login';
    }
    
    const config = ERROR_CONFIG[401];
    logError(errorData, config.message, config.code);
  },
  403: createErrorHandler(403),
  404: createErrorHandler(404),
  500: createErrorHandler(500),
};
