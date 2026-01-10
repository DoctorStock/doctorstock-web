import { Card } from '@/shared/ui/card';
import { useScrollOverlay } from '@/shared/hooks/useScrollOverlay';
import { MOCK_NOTIFICATIONS } from '../model/mocks';
import styles from './NotificationList.module.css';

export function NotificationList() {
  const notificationCount = MOCK_NOTIFICATIONS.length;
  const { listRef, showOverlay } = useScrollOverlay();

  return (
    <Card className={styles.card}>
      <h3 className={styles.title}>
        알림 <span className={styles.count}>{notificationCount}</span>
      </h3>
      <div className={styles.header}>
        <span className={styles.headerLabel}>일자</span>
        <span className={styles.headerLabel}>내용</span>
      </div>
      <div className={styles.listWrapper}>
        <div ref={listRef} className={styles.list}>
          {MOCK_NOTIFICATIONS.map((notification) => (
            <div key={notification.id} className={styles.item}>
              <span className={styles.date}>{notification.date}</span>
              <span className={styles.content}>{notification.content}</span>
            </div>
          ))}
        </div>
        {showOverlay && <div className={styles.fadeOverlay} />}
      </div>
    </Card>
  );
}

