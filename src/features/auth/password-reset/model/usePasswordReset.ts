import { useCallback, useState } from 'react';
import { useMutation } from '@tanstack/react-query';

import { SUPER_ADMIN_ID } from '@/shared/config/auth';
import { validatePassword } from '@/entities/auth';
import type { PasswordResetRequest } from '@/entities/auth/model/types';

import {
  PASSWORD_RESET_VALIDATION_MESSAGES,
  getPasswordResetErrorMessage,
} from '@/features/auth/password-reset';

import { passwordResetApi } from '../api/passwordResetApi';
import type { PasswordResetCredentials } from '../model/types';
import axios from 'axios';

export function usePasswordReset() {
  const [errorMessage, setErrorMessage] = useState('');
  const [errorType, setErrorType] = useState<'auth' | 'validation' | null>(
    null
  );

  const { mutateAsync, isPending } = useMutation({
    mutationFn: passwordResetApi,
  });

  const clearError = useCallback(() => {
    setErrorMessage('');
  }, []);

  const passwordReset = useCallback(
    async (credentials: PasswordResetCredentials): Promise<boolean> => {
      clearError();

      const { userId, currentPassword, newPassword } = credentials;

      // 동일 비밀번호 체크
      if (currentPassword === newPassword) {
        setErrorMessage(PASSWORD_RESET_VALIDATION_MESSAGES.SAME_PASSWORD);
        setErrorType('validation');
        return false;
      }

      // 비밀번호 규칙 체크
      if (userId !== SUPER_ADMIN_ID && !validatePassword(newPassword)) {
        setErrorMessage(PASSWORD_RESET_VALIDATION_MESSAGES.INVALID_PASSWORD);
        setErrorType('validation');
        return false;
      }

      try {
        // 서버 스펙에 맞게 필드명 변환
        const payload: PasswordResetRequest = {
          loginId: userId,
          currentPassword,
          newPassword,
        };

        const response = await mutateAsync(payload);

        if (!response.success) {
          setErrorMessage(getPasswordResetErrorMessage(response.error?.code));
          setErrorType('auth');
          return false;
        }

        return true;
      } catch (error) {
        // axios 에러 처리
        if (axios.isAxiosError(error)) {
          setErrorMessage(
            getPasswordResetErrorMessage(error.response?.data?.error?.code)
          );
          setErrorType('auth');
        } else {
          setErrorMessage(getPasswordResetErrorMessage());
          setErrorType('auth');
        }
        return false;
      }
    },
    [mutateAsync, clearError]
  );

  return {
    passwordReset,
    errorMessage,
    errorType,
    hasError: !!errorMessage,
    isLoading: isPending,
    clearError,
  };
}
