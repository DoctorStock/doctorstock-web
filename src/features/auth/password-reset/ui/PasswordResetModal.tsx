import clsx from 'clsx';
import styles from './PasswordResetModal.module.css';
import Portal from '@/shared/ui/portal/Portal';
import { usePasswordResetForm } from '@/features/auth/password-reset/';
import { VisibilityToggle } from '@/features/auth/login/';

interface PasswordResetModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (userId: string) => void;
}

export function PasswordResetModal({
  isOpen,
  onClose,
  onSuccess,
}: PasswordResetModalProps) {
  const {
    formData,
    visibility,
    errors,
    errorMessage,
    isMatched,
    hasConfirmPassword,
    isFormValid,
    handleChange,
    toggleVisibility,
    clearField,
    submit,
    reset,
  } = usePasswordResetForm(onSuccess);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const success = await submit(e);
    if (success) {
      onClose(); // 성공 시 모달 닫기
    }
  };

  if (!isOpen) return null;

  const handleClose = () => {
    reset();
    onClose();
  };

  return (
    <Portal>
      <div className={styles.modalOverlay}>
        <div className={styles.modalBox}>
          <header className={styles.modalHeader}>
            <h3>비밀번호 재설정</h3>
            <button
              type="button"
              className={styles.btnClose}
              onClick={handleClose}
              aria-label="닫기"
            />
          </header>
          <div className={styles.modalContent}>
            <form onSubmit={handleSubmit}>
              {/* 아이디 */}
              <div className={styles.inputAssets}>
                <label>아이디</label>
                <input
                  value={formData.userId}
                  onChange={handleChange('userId')}
                  placeholder="아이디를 입력해 주세요."
                  className={clsx(errors.userId && 'input-error')}
                />
                {formData.userId && (
                  <button
                    type="button"
                    onClick={() => clearField('userId')}
                    aria-label="창 비우기"
                  >
                    <img
                      src="/assets/input-reset.svg"
                      alt="창 비우기"
                      width={24}
                      height={24}
                    />
                  </button>
                )}
              </div>

              {/* 현재 비밀번호 */}
              <div className={styles.inputAssets}>
                <label>현재 비밀번호</label>
                <input
                  type={visibility.current ? 'text' : 'password'}
                  value={formData.currentPassword}
                  onChange={handleChange('currentPassword')}
                  placeholder="사용중인 비밀번호를 입력해 주세요."
                  className={clsx(errors.currentPassword && 'input-error')}
                />
                <VisibilityToggle
                  visible={visibility.current}
                  onToggle={() => toggleVisibility('current')}
                />
              </div>

              {/* 새 비밀번호 */}
              <div className={styles.inputAssets}>
                <label>새 비밀번호</label>
                <input
                  type={visibility.new ? 'text' : 'password'}
                  value={formData.newPassword}
                  onChange={handleChange('newPassword')}
                  placeholder="영문, 숫자, 특수문자 포함 8자 이상"
                  className={clsx(errorMessage && 'input-error')}
                />
                <VisibilityToggle
                  visible={visibility.new}
                  onToggle={() => toggleVisibility('new')}
                />

                {errorMessage && (
                  <p
                    className={clsx(
                      'input-message',
                      errorMessage ? 'error-message' : 'basic-message'
                    )}
                  >
                    {errorMessage}
                  </p>
                )}
              </div>

              {/* 확인 */}
              <div className={styles.inputAssets}>
                <label>새 비밀번호 확인</label>
                <input
                  type={visibility.confirm ? 'text' : 'password'}
                  value={formData.confirmPassword}
                  onChange={handleChange('confirmPassword')}
                  placeholder="새 비밀번호를 한번 더 입력해주세요."
                  className={clsx({
                    'input-error': hasConfirmPassword && !isMatched,
                  })}
                />
                <VisibilityToggle
                  visible={visibility.confirm}
                  onToggle={() => toggleVisibility('confirm')}
                />

                {hasConfirmPassword && (
                  <p
                    className={clsx(
                      'input-message',
                      isMatched ? 'basic-message' : 'error-message'
                    )}
                  >
                    {isMatched
                      ? '비밀번호가 일치합니다.'
                      : '비밀번호가 불일치합니다.'}
                  </p>
                )}
              </div>

              <button
                type="submit"
                disabled={!isFormValid || !isMatched}
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
