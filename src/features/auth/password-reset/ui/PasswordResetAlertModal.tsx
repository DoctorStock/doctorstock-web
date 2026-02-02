import Portal from '@/shared/ui/portal/Portal';
import styles from './PasswordResetAlertModal.module.css';

interface PasswordResetAlertModalProps {
  isOpen: boolean;
  onClose: () => void;
  userId: string | null;
}

export function PasswordResetAlertModal({
  isOpen,
  onClose,
  userId,
}: PasswordResetAlertModalProps) {
  if (!isOpen) return null;

  return (
    <Portal>
      <div className={styles.modalOverlay}>
        <div className={styles.modalBox}>
          <p>
            아이디 <span>{userId}</span>의<br />
            비밀번호를 변경하였습니다.
            <br />
            새로운 비밀번호로 로그인 해주세요.
          </p>
          <div className={styles.closeBtnWrap}>
            <button onClick={onClose} className="btn-primary">
              확인
            </button>
          </div>
        </div>
      </div>
    </Portal>
  );
}
