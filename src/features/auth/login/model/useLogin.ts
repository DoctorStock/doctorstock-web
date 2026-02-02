import { useCallback, useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';

import {
  validatePassword,
  saveTokens,
  type LoginCredentials,
  type LoginRequest,
} from '@/entities/auth';

import {
  LOGIN_ERROR_MESSAGES,
  getLoginErrorMessage,
} from '@/features/auth/login';

import { SUPER_ADMIN_ID } from '@/shared/config/auth';
import { loginApi } from '../api/loginApi';

export function useLogin() {
  const [errorMessage, setErrorMessage] = useState('');

  const { mutateAsync, isPending } = useMutation({
    mutationFn: loginApi,
  });

  const clearError = useCallback(() => {
    setErrorMessage('');
  }, []);

  const login = useCallback(
    async (
      credentials: LoginCredentials,
      autoLogin: boolean,
    ): Promise<boolean> => {
      clearError();

      const { userId, userPassword } = credentials;

      // 기본 길이 검증
      if (credentials.userPassword.length < 5) {
        setErrorMessage(LOGIN_ERROR_MESSAGES.DEFAULT);
        return false;
      }

      // 비밀번호 검증

      if (userId !== SUPER_ADMIN_ID && !validatePassword(userPassword)) {
        setErrorMessage(LOGIN_ERROR_MESSAGES.DEFAULT);
        return false;
      }

      try {
        // 서버 스펙에 맞게 필드명 변환
        const loginPayload: LoginRequest = {
          loginId: userId,
          password: userPassword,
        };

        const response = await mutateAsync(loginPayload);

        if (!response.success) {
          setErrorMessage(getLoginErrorMessage(response.error.code));
          return false;
        }

        // 성공 응답 처리
        saveTokens(
          response.data.accessToken,
          response.data.refreshToken,
          response.data.expiresIn,
          autoLogin,
        );

        return true;
      } catch (error) {
        // axios 에러 처리
        if (axios.isAxiosError(error)) {
          setErrorMessage(
            getLoginErrorMessage(error.response?.data?.error?.code),
          );
        } else {
          setErrorMessage(LOGIN_ERROR_MESSAGES.DEFAULT);
        }
        return false;
      }
    },
    [mutateAsync, clearError],
  );

  return {
    login,
    errorMessage,
    hasError: !!errorMessage,
    isLoggingIn: isPending,
    clearError,
  };
}
