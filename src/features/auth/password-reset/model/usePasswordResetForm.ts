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
  const { passwordReset, errorMessage, errorType, clearError } =
    usePasswordReset();

  const [formData, setFormData] = useState(INITIAL_FORM_DATA);
  const [visibility, setVisibility] = useState(INITIAL_VISIBILITY);
  const [confirmError, setConfirmError] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange =
    (field: keyof FormData) => (e: React.ChangeEvent<HTMLInputElement>) => {
      setFormData((prev) => ({ ...prev, [field]: e.target.value }));
      if (errorMessage) clearError();
      if (field === 'confirmPassword') setConfirmError('');
    };

  const toggleVisibility = (field: keyof PasswordVisibility) => {
    setVisibility((prev) => ({ ...prev, [field]: !prev[field] }));
  };

  const isMatched =
    formData.confirmPassword === formData.newPassword &&
    formData.confirmPassword !== '';

  const hasConfirmPassword = formData.confirmPassword !== '';

  const isFormValid = Object.values(formData).every(
    (value) => value.trim() !== ''
  );

  //에러타입에 따른 에러메세지 분기
  const authError = errorType === 'auth' ? errorMessage : '';
  const validationError = errorType === 'validation' ? errorMessage : '';

  const clearField = useCallback(
    (field: keyof FormData) => {
      setFormData((prev) => ({ ...prev, [field]: '' }));

      if (field === 'confirmPassword') {
        setConfirmError('');
      }

      clearError();
    },
    [clearError]
  );

  const reset = useCallback(() => {
    setFormData(INITIAL_FORM_DATA);
    setVisibility(INITIAL_VISIBILITY);
    setConfirmError('');
    clearError();
  }, [clearError]);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);

    if (!isMatched) {
      setConfirmError('비밀번호가 불일치합니다.');
      return;
    }

    const success = await passwordReset({
      userId: formData.userId,
      currentPassword: formData.currentPassword,
      newPassword: formData.newPassword,
    });

    if (success) {
      onSuccess(formData.userId);
      reset();
    }
  };

  return {
    /** state */
    formData,
    visibility,
    confirmError,
    isSubmitted,
    errorMessage,
    isMatched,
    hasConfirmPassword,
    isFormValid,
    authError,
    validationError,

    /** actions */
    handleChange,
    toggleVisibility,
    clearField,
    submit,
    reset,
  };
}
