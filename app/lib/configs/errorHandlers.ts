// 내부 모듈
import { NetworkError } from '@/app/api/types';
import { AUTH_STORAGE_KEYS } from '../auth';

// ===== 상수 =====
// 상태 코드별 에러 설정 (에러 코드 + 메시지)
const ERROR_CONFIG = {
  401: { code: 'AUTH_ERROR', message: '인증이 만료되었습니다. 다시 로그인해주세요' },
  403: { code: 'FORBIDDEN', message: '접근 권한이 없습니다' },
  404: { code: 'NOT_FOUND', message: '요청한 리소스를 찾을 수 없습니다' },
  500: { code: 'SERVER_ERROR', message: '서버 오류가 발생했습니다' },
} as const;

// 기본 에러 설정 (알 수 없는 에러)
export const UNKNOWN_ERROR = { code: 'UNKNOWN_ERROR', message: '에러가 발생했습니다' } as const;

// ===== 내부 함수 =====
// 공통 에러 핸들러 생성 함수
const createErrorHandler = (status: number) => {
  return (errorData: NetworkError | undefined) => {
    const config = ERROR_CONFIG[status as keyof typeof ERROR_CONFIG];
    if (config) {
      logError(errorData, config.message, config.code);
    }
  };
};

// ===== Export =====
// 에러 로그
export const logError = (
  errorData: NetworkError | undefined,
  defaultMessage: string,
  defaultCode: string
): void => {
  const errorMessage = errorData?.message || defaultMessage;
  const errorCode = errorData?.code || defaultCode;
  console.error(`[${errorCode}] ${errorMessage}`);
};

// 에러 핸들러 - 상태 코드별
export const errorHandlers: Record<number, (errorData: NetworkError | undefined) => void> = {
  // 토큰을 제거후, 로그인 페이지로 redirect
  401: (errorData) => { // 인증 오류
    // 토큰 제거
    localStorage.removeItem(AUTH_STORAGE_KEYS.ACCESS_TOKEN);
    localStorage.removeItem(AUTH_STORAGE_KEYS.REFRESH_TOKEN);

    // 클라이언트 사이드에서만 동작하도록 체크
    if (typeof window !== 'undefined') {
      window.location.href = '/pages/login';
    }

    const config = ERROR_CONFIG[401];
    logError(errorData, config.message, config.code);
  },
  403: createErrorHandler(403), // 권한 없음
  404: createErrorHandler(404), // 리소스를 찾을 수 없음
  500: createErrorHandler(500), // 서버 내부 오류
};

