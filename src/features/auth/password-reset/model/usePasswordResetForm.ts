import { useState, useCallback } from 'react';
import { usePasswordReset } from '@/features/auth/password-reset';

interface FormData {
  userId: string;
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

interface PasswordVisibility {
  current: boolean;
  new: boolean;
  confirm: boolean;
}

type FormErrors = Partial<Record<keyof FormData, string>>;

const INITIAL_FORM_DATA: FormData = {
  userId: '',
  currentPassword: '',
  newPassword: '',
  confirmPassword: '',
};

const INITIAL_VISIBILITY: PasswordVisibility = {
  current: false,
  new: false,
  confirm: false,
};

export function usePasswordResetForm(onSuccess: (userId: string) => void) {
  const { passwordReset, errorMessage, clearError } = usePasswordReset();

  const [formData, setFormData] = useState<FormData>(INITIAL_FORM_DATA);
  const [visibility, setVisibility] =
    useState<PasswordVisibility>(INITIAL_VISIBILITY);
  const [errors, setErrors] = useState<FormErrors>({});

  const handleChange = useCallback(
    (field: keyof FormData) => (e: React.ChangeEvent<HTMLInputElement>) => {
      setFormData((prev) => ({ ...prev, [field]: e.target.value }));
      if (errorMessage) clearError();
    },
    [errorMessage, clearError]
  );

  const toggleVisibility = useCallback((field: keyof PasswordVisibility) => {
    setVisibility((prev) => ({ ...prev, [field]: !prev[field] }));
  }, []);

  const isMatched =
    formData.confirmPassword === formData.newPassword &&
    formData.confirmPassword !== '';

  const hasConfirmPassword = formData.confirmPassword !== '';

  const isFormValid = Object.values(formData).every(
    (value) => value.trim() !== ''
  );

  const clearField = useCallback((field: keyof FormData) => {
    setFormData((prev) => ({ ...prev, [field]: '' }));
  }, []);

  const reset = useCallback(() => {
    setFormData(INITIAL_FORM_DATA);
    setVisibility(INITIAL_VISIBILITY);
    setErrors({});
    clearError();
  }, [clearError]);

  const submit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();

      if (!isMatched) {
        setErrors({ confirmPassword: '비밀번호가 불일치합니다.' });
        return false;
      }

      try {
        const result = await passwordReset({
          userId: formData.userId,
          currentPassword: formData.currentPassword,
          newPassword: formData.newPassword,
        });

        if (result.success) {
          onSuccess?.(formData.userId);
          reset();
          return true;
        }

        return false;
      } catch (error) {
        console.error('비밀번호 재설정 실패:', error);
        return false;
      }
    },
    [formData, isMatched, passwordReset, onSuccess, reset]
  );

  return {
    /** state */
    formData,
    visibility,
    errors,
    errorMessage,
    isMatched,
    hasConfirmPassword,
    isFormValid,

    /** actions */
    handleChange,
    toggleVisibility,
    clearField,
    submit,
    reset,
  };
}
