import { useState } from 'react';
import styles from './loginComponents.module.css';
import clsx from 'clsx';
import Portal from './Portal';
import Image from 'next/image';
import { useAuth } from '@/app/hooks/useAuth';

interface PasswordResetModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (userId: string) => void;
}

type FormData = {
  userId: string;
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
};

type PasswordVisibility = {
  current: boolean;
  new: boolean;
  confirm: boolean;
};

type FormErrors = Partial<Record<keyof FormData, string>>;

const INITIAL_FORM_DATA: FormData = {
  userId: '',
  currentPassword: '',
  newPassword: '',
  confirmPassword: '',
};

const INITIAL_PASSWORD_VISIBILITY: PasswordVisibility = {
  current: false,
  new: false,
  confirm: false,
};

export default function BasicModal({
  isOpen,
  onClose,
  onSuccess,
}: PasswordResetModalProps) {
  const { resetPassword, errorMessage, clearLoginError } = useAuth();
  const [formData, setFormData] = useState<FormData>(INITIAL_FORM_DATA);
  const [visibility, setVisibility] = useState<PasswordVisibility>(
    INITIAL_PASSWORD_VISIBILITY
  );

  const [errors, setErrors] = useState<FormErrors>({});

  //FormData key를 이용하여 각 key에 해당하는 함수를 만들고, 필드의 value 업데이트
  const handleChange =
    (field: keyof FormData) => (e: React.ChangeEvent<HTMLInputElement>) => {
      setFormData(prev => ({
        ...prev,
        [field]: e.target.value,
      }));
      if (errorMessage) {
        clearLoginError();
      }
    };

  const toggleVisibility = (field: keyof PasswordVisibility) => {
    setVisibility(prev => ({
      ...prev,
      [field]: !prev[field],
    }));
  };

  //버튼 활성화를 위한 폼 유효성 체크
  const isFormValid = (formData: FormData): boolean => {
    return Object.values(formData).every(value => value.trim() !== '');
  };

  const isMatched =
    formData.confirmPassword === formData.newPassword &&
    formData.confirmPassword !== '';
  let confirmMessage = '';

  if (formData.confirmPassword === '') {
    confirmMessage = '';
  } else if (formData.confirmPassword === formData.newPassword) {
    confirmMessage = '비밀번호가 일치합니다.';
  } else {
    confirmMessage = '비밀번호가 불일치합니다.';
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const newErrors: FormErrors = {};

    if (!isMatched) {
      newErrors.confirmPassword = confirmMessage;
      setErrors(newErrors);
      return;
    }

    try {
      const result = await resetPassword({
        userId: formData.userId,
        currentPassword: formData.currentPassword,
        newPassword: formData.newPassword,
      })
      if (result.success) {
      onSuccess(formData.userId);
      handleClose();
      }
    } catch (error) {
      console.error('비밀번호 재설정 실패:', error);
    }
  };

  const handleClose = () => {
    setFormData(INITIAL_FORM_DATA);
    setVisibility(INITIAL_PASSWORD_VISIBILITY);
    setErrors({});
    clearLoginError();
    onClose();
  };

  if (!isOpen) return null;

  return (
    <Portal>
      <div className={styles.modalOverlay}>
        <div className={styles.modalBox}>
          <div className={styles.modalHeader}>
            <h3>비밀번호 재설정</h3>
            <button
              type='button'
              onClick={handleClose}
              aria-label='닫기'
              className={styles.btnClose}
            ></button>
          </div>
          <div className={styles.modalContent}>
            <form onSubmit={handleSubmit}>
              <div className={clsx(styles.inputAssets, 'inputAssets')}>
                <label htmlFor='modal-userId'>아이디</label>
                <input
                  type='text'
                  id='modal-userId'
                  value={formData.userId}
                  onChange={handleChange('userId')}
                  placeholder='아이디를 입력해 주세요.'
                  className={clsx(errors.userId && 'input-error')}
                />
                {formData.userId && (
                  <button
                    type='button'
                    onClick={() =>
                      setFormData(prev => ({ ...prev, userId: '' }))
                    }
                    aria-label='창 비우기'
                  >
                    <Image
                      src='/assets/input-reset.svg'
                      alt='닥터스톡로고'
                      width={24}
                      height={24}
                    ></Image>
                  </button>
                )}
              </div>
              <div className={clsx(styles.inputAssets, 'inputAssets')}>
                <label htmlFor='modal-currentPassword'>현재 비밀번호</label>
                <input
                  type={visibility.current ? 'text' : 'password'}
                  id='modal-currentPassword'
                  value={formData.currentPassword}
                  onChange={handleChange('currentPassword')}
                  placeholder='사용중인 비밀번호를 입력해 주세요.'
                  className={clsx(errors.currentPassword && 'input-error')}
                />
                <button
                  type='button'
                  onClick={() => toggleVisibility('current')}
                  aria-label={
                    visibility.current
                      ? '현재 비밀번호 숨기기'
                      : '현재 비밀번호 보이기'
                  }
                >
                  {visibility.current ? (
                    <Image
                      src='/assets/shown.svg'
                      alt='현재 비밀번호 보이기'
                      width={24}
                      height={24}
                    ></Image>
                  ) : (
                    <Image
                      src='/assets/unshown.svg'
                      alt='현재 비밀번호 숨기기'
                      width={24}
                      height={24}
                    ></Image>
                  )}
                </button>
              </div>
              {errorMessage && (
                <p className={clsx('input-message', 'error-message')}>
                  {errorMessage}
                </p>
              )}
              <div className={clsx(styles.inputAssets, 'inputAssets')}>
                <label htmlFor='modal-newPassword'>새 비밀번호</label>
                <input
                  type={visibility.new ? 'text' : 'password'}
                  id='modal-newPassword'
                  value={formData.newPassword}
                  onChange={e => {
                    handleChange('newPassword')(e);
                    setErrors(prev => ({ ...prev, newPassword: '' }));
                  }}
                  placeholder='영문, 숫자, 특수문자 포함 8자 이상'
                  className={clsx(errors.newPassword && 'input-error')}
                />
                <button
                  type='button'
                  onClick={() => toggleVisibility('new')}
                  aria-label={
                    visibility.new ? '새 비밀번호 숨기기' : '새 비밀번호 보이기'
                  }
                >
                  {visibility.new ? (
                    <Image
                      src='/assets/shown.svg'
                      alt='새 비밀번호 보이기'
                      width={24}
                      height={24}
                    ></Image>
                  ) : (
                    <Image
                      src='/assets/unshown.svg'
                      alt='새 비밀번호 숨기기'
                      width={24}
                      height={24}
                    ></Image>
                  )}
                </button>
                <p
                  className={clsx(
                    'input-message',
                    errors.newPassword ? 'error-message' : 'basic-message'
                  )}
                >
                  {errors.newPassword}
                </p>
              </div>
              <div className={clsx(styles.inputAssets, 'inputAssets')}>
                <label htmlFor='modal-confirmPassword'>새 비밀번호 확인</label>
                <input
                  type={visibility.confirm ? 'text' : 'password'}
                  id='modal-confirmPassword'
                  value={formData.confirmPassword}
                  onChange={e => {
                    handleChange('confirmPassword')(e);
                    setErrors({ ...errors, confirmPassword: '' });
                  }}
                  placeholder='새 비밀번호를 한번 더 입력해주세요.'
                  className={clsx({
                    'input-error':
                      !isMatched && formData.confirmPassword !== '',
                  })}
                />
                <button
                  type='button'
                  onClick={() => toggleVisibility('confirm')}
                  aria-label={
                    visibility.confirm
                      ? '새 비밀번호 확인 보이기'
                      : '새 비밀번호 확인 숨기기'
                  }
                >
                  {visibility.confirm ? (
                    <Image
                      src='/assets/shown.svg'
                      alt='새 비밀번호 확인 보이기'
                      width={24}
                      height={24}
                    ></Image>
                  ) : (
                    <Image
                      src='/assets/unshown.svg'
                      alt='새 비밀번호 확인 숨기기'
                      width={24}
                      height={24}
                    ></Image>
                  )}
                </button>
                <p
                  className={clsx(
                    'input-message',
                    isMatched ? 'basic-message' : 'error-message'
                  )}
                >
                  {confirmMessage}
                </p>
              </div>
              <button
                type='submit'
                disabled={!isFormValid}
                className={clsx('btn-primary', styles.submitBtn)}
              >
                변경하기
              </button>
            </form>
          </div>
        </div>
      </div>
    </Portal>
  );
}
