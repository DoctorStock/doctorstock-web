'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { AUTH_STORAGE_KEYS, removeSavedId, saveUserId } from '../lib/auth';

interface LoginCredentials {
  userId: string;
  userPassword: string;
}

export const useAuth = () => {
  const router = useRouter();
  const [errorMessage, setErrorMessage] = useState('');

  const login = async (credentials: LoginCredentials, saveId: boolean) => {
    setErrorMessage('');

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
        setErrorMessage(data.error || '로그인 실패');
        return false;
      }

      // 로그인 성공 시 토큰 저장
      localStorage.setItem(AUTH_STORAGE_KEYS.ACCESS_TOKEN, data.accessToken);
      localStorage.setItem(AUTH_STORAGE_KEYS.REFRESH_TOKEN, data.refreshToken);

      // 아이디 저장 옵션
      if (saveId) {
        saveUserId(credentials.userId);
      } else {
        removeSavedId();
      }

      // 로그인 성공 이후 메인페이지로 이동
      router.push('/');
      return true;
    } catch (error) {
      console.error('로그인 에러:', error);
      setErrorMessage('서버 오류가 발생했습니다.');
      return false;
    }
  };
  return {
    login,
    errorMessage,
  };
};
