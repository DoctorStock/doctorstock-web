import { useCallback, useMemo, useState } from 'react';
import { getSavedUserId, removeSavedId, saveUserId } from '@/entities/auth';
import { AUTH_STORAGE_KEYS } from '@/shared/config/auth';
import { useLogin } from '@/features/auth/login';
import { useNavigate } from 'react-router-dom';

interface LoginFormValues {
  userId: string;
  userPassword: string;
}

export function useLoginForm() {
  const savedUserId = getSavedUserId();
  const navigate = useNavigate();

  const [userId, setUserId] = useState(() => savedUserId ?? '');
  const [userPassword, setUserPassword] = useState('');
  const [visibility, setVisibility] = useState(false);
  const [autoLogin, setAutoLogin] = useState(false);
  const [saveId, setSaveId] = useState(() => Boolean(savedUserId));
  const [isPasswordResetModalOpen, setIsPasswordResetModalOpen] =
    useState(false);
  const [isPasswordResetAlertModalOpen, setIsPasswordResetAlertModalOpen] =
    useState(false);
  const [passwordResetUserId, setPasswordResetUserId] = useState<string | null>(
    null
  );

  /** auth */
  const { login, clearError, errorMessage, hasError } = useLogin();

  /** 폼 유효성 */
  const isFormValid = useMemo(
    () => userId.trim() !== '' && userPassword.trim() !== '',
    [userId, userPassword]
  );

  /** 핸들러 */
  const handleChangeUserId = useCallback(
    (value: string) => {
      setUserId(value);
      if (hasError) clearError();
    },
    [hasError, clearError]
  );

  const handleChangePassword = useCallback(
    (value: string) => {
      setUserPassword(value);
      if (hasError) clearError();
    },
    [hasError, clearError]
  );

  const toggleVisibility = useCallback(() => {
    setVisibility((prev) => !prev);
  }, []);

  const handleLoginSuccess = useCallback(
    (userId: string) => {
      if (saveId) saveUserId(userId);
      else removeSavedId();

      localStorage.setItem(
        AUTH_STORAGE_KEYS.AUTO_LOGIN,
        autoLogin ? 'true' : 'false'
      );

      navigate('/');
    },
    [saveId, autoLogin, navigate]
  );

  const handleSubmit = useCallback(
    async (values?: LoginFormValues) => {
      const formValues = values ?? { userId, userPassword };
      const success = await login(formValues, autoLogin);

      if (success) {
        handleLoginSuccess(formValues.userId);
      }
    },
    [userId, userPassword, autoLogin, login, handleLoginSuccess]
  );

  /** 비밀번호 재설정 성공 처리 */
  const handlePasswordResetSuccess = useCallback((userId: string) => {
    setPasswordResetUserId(userId);
    setIsPasswordResetModalOpen(false);
    setIsPasswordResetAlertModalOpen(true);
  }, []);

  return {
    /** 상태 */
    userId,
    userPassword,
    visibility,
    autoLogin,
    saveId,
    isFormValid,

    /** 에러 */
    errorMessage,
    hasError,

    /** 모달 */
    isPasswordResetModalOpen,
    isPasswordResetAlertModalOpen,
    passwordResetUserId,

    /** setters */
    setAutoLogin,
    setSaveId,
    setIsPasswordResetModalOpen,
    setIsPasswordResetAlertModalOpen,

    /** handlers */
    handleChangeUserId,
    handleChangePassword,
    toggleVisibility,
    handleSubmit,
    handlePasswordResetSuccess,
  };
}
