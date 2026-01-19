import { useCallback, useMemo, useState } from 'react';
import { getSavedUserId, removeSavedId, saveUserId } from '@/entities/auth';
import { AUTH_STORAGE_KEYS } from '@/shared/config/auth';
import { useLogin } from '@/features/auth/login';

interface LoginFormValues {
  userId: string;
  userPassword: string;
}

export function useLoginForm() {
  const savedUserId = getSavedUserId();

  const [userId, setUserId] = useState(() => savedUserId ?? '');
  const [userPassword, setUserPassword] = useState('');
  const [visibility, setVisibility] = useState(false);
  const [autoLogin, setAutoLogin] = useState(false);
  const [saveId, setSaveId] = useState(() => Boolean(savedUserId));

  const [isPasswordResetModalOpen, setIsPasswordResetModalOpen] =
    useState(false);
  const [isBasicModalOpen, setIsBasicModalOpen] = useState(false);
  const [basicModalMessage, setBasicModalMessage] = useState('');

  /** ======================
   * Auth Entity 
   ====================== */
  const { login, clearError, errorMessage, hasError } = useLogin();

  /** ======================
   * 폼 유효성
   ====================== */
  const isFormValid = useMemo(
    () => userId.trim() !== '' && userPassword.trim() !== '',
    [userId, userPassword]
  );

  /** ======================
   * 핸들러
   ====================== */
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

  const handleSubmit = useCallback(
    async (values?: LoginFormValues) => {
      const payload = values ?? { userId, userPassword };

      const success = await login(
        {
          userId: payload.userId,
          userPassword: payload.userPassword,
        },
        autoLogin
      );

      if (success) {
        //1. 아이디 저장
        if (saveId) {
          saveUserId(payload.userId);
        } else {
          removeSavedId();
        }

        //2. 자동 로그인 설정

        localStorage.setItem(
          AUTH_STORAGE_KEYS.AUTO_LOGIN,
          autoLogin ? 'true' : 'false'
        );
      }
    },
    [userId, userPassword, saveId, autoLogin, login]
  );

  /** ======================
   * 비밀번호 재설정 성공 처리
   ====================== */
  const handlePasswordResetSuccess = useCallback((userId: string) => {
    setBasicModalMessage(
      `아이디 ${userId}의 비밀번호를 변경하였습니다. 새로운 비밀번호로 로그인 해주세요.`
    );
    setIsBasicModalOpen(true);
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
    isBasicModalOpen,
    basicModalMessage,

    /** setters */
    setAutoLogin,
    setSaveId,
    setIsPasswordResetModalOpen,
    setIsBasicModalOpen,

    /** handlers */
    handleChangeUserId,
    handleChangePassword,
    toggleVisibility,
    handleSubmit,
    handlePasswordResetSuccess,
  };
}
