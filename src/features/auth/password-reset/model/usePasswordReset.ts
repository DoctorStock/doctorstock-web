import { useCallback, useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { SUPER_ADMIN_ID } from '@/shared/config/auth';
import { getLoginErrorMessages } from '@/shared/constants/loginErrorMessages';
import {
  validatePassword,
  type PasswordResetCredentials,
} from '@/entities/auth';
import { passwordResetApi } from '@/features/auth/password-reset';

export function usePasswordReset() {
  const [errorMessage, setErrorMessage] = useState('');

  const mutation = useMutation({ mutationFn: passwordResetApi });

  const clearError = useCallback(() => {
    setErrorMessage('');
  }, []);

  const passwordReset = useCallback(
    async (
      credentials: PasswordResetCredentials
    ): Promise<{ success: boolean; userId?: string }> => {
      clearError();

      if (credentials.currentPassword === credentials.newPassword) {
        setErrorMessage(
          '현재 비밀번호와 동일합니다. 다른 비밀번호를 사용해 주세요.'
        );
        return { success: false };
      }
      const isSuperAdmin = credentials.userId === SUPER_ADMIN_ID;
      if (
        !validatePassword(credentials.newPassword, {
          skip: isSuperAdmin,
        })
      ) {
        setErrorMessage(
          '영문, 숫자, 특수문자를 포함하여 8자 이상 입력해 주세요.'
        );
        return { success: false };
      }
      try {
        const data = await mutation.mutateAsync(credentials);

        if (!data.success) {
          setErrorMessage(getLoginErrorMessages(data.errorCode));
          return { success: false };
        }
        return { success: true, userId: credentials.userId };
      } catch (error) {
        console.error('reset password error', error);
        setErrorMessage(
          '비밀번호 변경에 실패했습니다. 관리자에게 문의해 주세요.'
        );
        return { success: false };
      }
    },
    [mutation, clearError]
  );

  return {
    errorMessage,
    hasError: !!errorMessage,
    isLoading: mutation.isPending,
    passwordReset,
    clearError,
  };
}
