'use client';

import { useRouter } from 'next/navigation';
import { useCallback, useState } from 'react';
import {
  AUTH_STORAGE_KEYS,
  SUPER_ADMIN_ID,
  removeSavedId,
  saveUserId,
  validatePassword,
} from '../lib/auth/auth';
import { LOGIN_ERROR_MESSAGES } from '../constants/loginErrorMessages';
import { getLoginErrorMessages } from '../lib/auth/getLoginErrorMessages';

interface LoginCredentials {
  userId: string;
  userPassword: string;
}

interface ResetPasswordCredentials {
  userId: string;
  currentPassword: string;
  newPassword: string;
}

export const useAuth = () => {
  const router = useRouter();
  const [errorMessage, setErrorMessage] = useState('');
  const [hasLoginError, setHasLoginError] = useState(false);

  const setLoginError = (message: string) => {
    setErrorMessage(message);
    setHasLoginError(true);
  };

  const clearLoginError = () => {
    setErrorMessage('');
    setHasLoginError(false);
  };

  //로그인 처리
  const login = async (
    credentials: LoginCredentials,
    saveId: boolean,
    autoLogin: boolean
  ) => {
    clearLoginError();

    const isSuperAdmin = credentials.userId === SUPER_ADMIN_ID;

    // 비밀번호 유효성 검사
    if (
      !validatePassword(credentials.userPassword, {
        skip: isSuperAdmin,
      })
    ) {
      setLoginError(LOGIN_ERROR_MESSAGES.DEFAULT);
      return false;
    }

    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId: credentials.userId,
          userPassword: credentials.userPassword,
        }),
      });

      const data = await response.json();

      // 로그인 실패 시
      if (!response.ok || !data.success) {
        setLoginError(getLoginErrorMessages(data.errorCode));
        return false;
      }

      //  토큰 누락 (비정상 케이스)
      if (!data.accessToken || !data.refreshToken) {
        console.error('토큰 누락:', data);
        setLoginError(LOGIN_ERROR_MESSAGES.DEFAULT);
        return false;
      }

      //  로그인 성공
      localStorage.setItem(AUTH_STORAGE_KEYS.ACCESS_TOKEN, data.accessToken);

      // 만료 시간 계산 및 저장
      if (data.expiresIn) {
        const expiresAt = Date.now() + data.expiresIn * 1000;
        localStorage.setItem(
          AUTH_STORAGE_KEYS.ACCESS_TOKEN_EXPIRES_AT,
          expiresAt.toString()
        );
        console.log(
          `AccessToken 만료 시간: ${new Date(expiresAt).toLocaleString()}`
        );
      }

      if (saveId) {
        saveUserId(credentials.userId);
      } else {
        removeSavedId();
      }

      localStorage.setItem(
        AUTH_STORAGE_KEYS.AUTO_LOGIN,
        autoLogin ? 'true' : 'false'
      );

      if (autoLogin) {
        localStorage.setItem(
          AUTH_STORAGE_KEYS.REFRESH_TOKEN,
          data.refreshToken
        );
        sessionStorage.removeItem(AUTH_STORAGE_KEYS.REFRESH_TOKEN);
      } else {
        localStorage.removeItem(AUTH_STORAGE_KEYS.REFRESH_TOKEN);
        sessionStorage.setItem(
          AUTH_STORAGE_KEYS.REFRESH_TOKEN,
          data.refreshToken
        );
      }

      clearLoginError();
      router.push('/pages/home');
      return true;
    } catch (error) {
      //  네트워크 / 런타임 에러
      console.error('로그인 에러:', error);
      setLoginError(LOGIN_ERROR_MESSAGES.DEFAULT);
      return false;
    }
  };

  const checkAutoLogin = useCallback(async (): Promise<boolean> => {
    try {
      // localStorage에서 토큰 정보 가져오기
      const accessToken = localStorage.getItem(AUTH_STORAGE_KEYS.ACCESS_TOKEN);
      const expiresAt = localStorage.getItem(
        AUTH_STORAGE_KEYS.ACCESS_TOKEN_EXPIRES_AT
      );
      const autoLogin =
        localStorage.getItem(AUTH_STORAGE_KEYS.AUTO_LOGIN) === 'true';
      const refreshToken = autoLogin
        ? localStorage.getItem(AUTH_STORAGE_KEYS.REFRESH_TOKEN)
        : sessionStorage.getItem(AUTH_STORAGE_KEYS.REFRESH_TOKEN);

      //자동로그인 해제 또는 refreshToken이 없으면 종료
      if (!autoLogin || !refreshToken) {
        return false;
      }

      //AccessToken 유효하면 바로 홈으로 이동
      if (accessToken && expiresAt) {
        const now = Date.now();
        const expiresAtTime = parseInt(expiresAt);

        if (now < expiresAtTime) {
          router.push('/pages/home');
          return true;
        }
      }

      //AccessToken이 없거나 만료된 경우 -> RefreshToken으로 갱신 시도
      const response = await fetch(`/api/auth/refresh`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ refreshToken }),
      });

      const data = await response.json();

      //refresh 토큰이 유효하지 않거나 만료시 모든 인증정보 삭제
      if (!response.ok || !data.success) {
        localStorage.removeItem(AUTH_STORAGE_KEYS.ACCESS_TOKEN);
        localStorage.removeItem(AUTH_STORAGE_KEYS.ACCESS_TOKEN_EXPIRES_AT);
        localStorage.removeItem(AUTH_STORAGE_KEYS.REFRESH_TOKEN);
        sessionStorage.removeItem(AUTH_STORAGE_KEYS.REFRESH_TOKEN);
        return false;
      }

      //새 AccessToken 저장
      if (data.accessToken) {
        localStorage.setItem(AUTH_STORAGE_KEYS.ACCESS_TOKEN, data.accessToken);
      }

      //새 만료 시간 저장
      if (data.expiresIn) {
        const newExpiresAt = Date.now() + data.expiresIn * 1000;
        localStorage.setItem(
          AUTH_STORAGE_KEYS.ACCESS_TOKEN_EXPIRES_AT,
          newExpiresAt.toString()
        );
        console.log(
          `AccessToken 만료 시간: ${new Date(newExpiresAt).toLocaleString()}`
        );
      }
      // 새 RefreshToken 저장
      if (data.refreshToken) {
        const autoLogin =
          localStorage.getItem(AUTH_STORAGE_KEYS.AUTO_LOGIN) === 'true';
        if (autoLogin) {
          localStorage.setItem(
            AUTH_STORAGE_KEYS.REFRESH_TOKEN,
            data.refreshToken
          );
        } else {
          sessionStorage.setItem(
            AUTH_STORAGE_KEYS.REFRESH_TOKEN,
            data.refreshToken
          );
        }
      }

      router.push('/pages/home');
      return true;
    } catch (error) {
      console.error('자동 로그인 에러:', error);
      localStorage.removeItem(AUTH_STORAGE_KEYS.ACCESS_TOKEN);
      localStorage.removeItem(AUTH_STORAGE_KEYS.ACCESS_TOKEN_EXPIRES_AT);
      localStorage.removeItem(AUTH_STORAGE_KEYS.REFRESH_TOKEN);
      sessionStorage.removeItem(AUTH_STORAGE_KEYS.REFRESH_TOKEN);
      return false;
    }
  }, [router]);

  //비밀번호 재설정
  const resetPassword = async (credentials: ResetPasswordCredentials) => {
    clearLoginError();

    if (credentials.currentPassword === credentials.newPassword) {
      setLoginError(
        `현재 비밀번호와 동일합니다. 다른 비밀번호를 사용해 주세요.`
      );
      return { success: false };
    }

    const isSuperAdmin = credentials.userId === SUPER_ADMIN_ID;
    if (!validatePassword(credentials.newPassword, { skip: isSuperAdmin })) {
      setLoginError(`영문, 숫자, 특수문자를 포함하여 8자 이상 입력해 주세요.`);
      return { success: false };
    }

    try {
      const response = await fetch(
        `/api/users/${credentials.userId}/password`,
        {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            currentPassword: credentials.currentPassword,
            newPassword: credentials.newPassword,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok || !data.success) {
        setLoginError(getLoginErrorMessages(data.errorCode));
        return { success: false };
      }

      clearLoginError();
      return { success: true, userID: credentials.userId };
    } catch (error) {
      //네트워크 / 런타임 에러
      console.error('비밀번호 변경 에러', error);
      //TODO: 비밀번호 변경 에러 메시지 정책 확정 후 통합 예정
      setLoginError(`비밀번호 변경에 실패했습니다. 관리자에게 문의해 주세요.`);
      return { success: false };
    }
  };

  return {
    login,
    resetPassword,
    checkAutoLogin,
    errorMessage,
    hasLoginError,
    clearLoginError,
  };
};
