'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
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

  const login = async (credentials: LoginCredentials, saveId: boolean) => {
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
      localStorage.setItem(AUTH_STORAGE_KEYS.REFRESH_TOKEN, data.refreshToken);

      if (saveId) {
        saveUserId(credentials.userId);
      } else {
        removeSavedId();
      }

      clearLoginError();
      router.push('/');
      return true;
    } catch (error) {
      //  네트워크 / 런타임 에러
      console.error('로그인 에러:', error);
      setLoginError(LOGIN_ERROR_MESSAGES.DEFAULT);
      return false;
    }
  };
  return {
    login,
    errorMessage,
    hasLoginError,
    clearLoginError,
  };
};
