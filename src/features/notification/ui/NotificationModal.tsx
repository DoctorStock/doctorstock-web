import { useNotification } from '@/features/notification/model/useNotification';
import styles from './NotificationModal.module.css';

export function NotificationModal() {
  const { handleNotification } = useNotification();

  return (
    <button
      onClick={handleNotification}
      className={styles.notificationModal}
      aria-label="알림"
    >

      <img
        src="/assets/bell_on.svg"
        alt="알림"
        width={16}
        height={16}
      />

    </button>
  );
}
