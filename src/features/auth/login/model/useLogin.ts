import { useCallback, useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import {
  getLoginErrorMessages,
  LOGIN_ERROR_MESSAGES,
} from '@/shared/constants/loginErrorMessages';
import { SUPER_ADMIN_ID } from '@/shared/config/auth';
import {
  validatePassword,
  saveTokens,
  type LoginCredentials,
} from '@/entities/auth/';
import { loginApi } from '../api/loginApi';

export function useLogin() {
  const [errorMessage, setErrorMessage] = useState('');

  const loginMutation = useMutation({
    mutationFn: loginApi,
  });

  const clearError = useCallback(() => {
    setErrorMessage('');
  }, []);

  const login = useCallback(
    async (
      credentials: LoginCredentials,
      autoLogin: boolean
    ): Promise<boolean> => {
      clearError();

      const isSuperAdmin = credentials.userId === SUPER_ADMIN_ID;

      // 비밀번호 유효성 검사
      if (
        !validatePassword(credentials.userPassword, {
          skip: isSuperAdmin,
        })
      ) {
        setErrorMessage(LOGIN_ERROR_MESSAGES.DEFAULT);
        return false;
      }

      try {
        const data = await loginMutation.mutateAsync(credentials);

        if (!data.success || !data.accessToken || !data.refreshToken) {
          setErrorMessage(getLoginErrorMessages(data.errorCode));
          return false;
        }

        // 토큰 저장
        saveTokens(
          data.accessToken,
          data.refreshToken,
          data.expiresIn,
          autoLogin
        );

        return true;
      } catch (error) {
        console.error('login error', error);
        setErrorMessage(LOGIN_ERROR_MESSAGES.DEFAULT);
        return false;
      }
    },
    [loginMutation, clearError]
  );

  return {
    errorMessage,
    hasError: !!errorMessage,
    isLoggingIn: loginMutation.isPending,
    login,
    clearError,
  };
}
