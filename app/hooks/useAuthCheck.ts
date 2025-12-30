// 외부
import { AxiosError } from 'axios';

// 내부 모듈
import { ErrorResponse } from '@/app/api/types';
import { AUTH_STORAGE_KEYS } from '@/app/lib/auth';

// ===== Export =====
// 인증이 필요한 작업을 수행하기 전에 토큰을 확인하는 Hook
const useAuthCheck = () => {
  return async <T>(callback?: () => Promise<T | void>): Promise<T | void> => {
    // 토큰 확인
    const accessToken = localStorage.getItem(AUTH_STORAGE_KEYS.ACCESS_TOKEN);

    // 토큰이 없으면 로그인 페이지로 이동
    if (!accessToken) {
      alert('로그인이 필요합니다!');
      if (typeof window !== 'undefined') {
        window.location.href = '/pages/login';
      }
      return;
    }

    if (!callback) return;

    try {
      return await callback();
    } catch (err) {
      const error = err as AxiosError<ErrorResponse>;
      const errorCode = error.response?.data?.error?.code;

      // 인증 관련 에러인 경우
      if (errorCode && ['AUTH_ERROR', 'FORBIDDEN', 'UNAUTHORIZED'].includes(errorCode)) {
        alert('로그인이 필요합니다!');
        if (typeof window !== 'undefined') {
          window.location.href = '/pages/login';
        }
        return;
      }

      // 다른 에러는 그대로 throw
      throw error;
    }
  };
};

export default useAuthCheck;

