import { Card } from '@/shared/ui/card';
import { MOCK_NOTIFICATIONS } from '../model/mocks';
import { useScrollOverlay } from '@/shared/hooks/useScrollOverlay';
import styles from './NotificationList.module.css';

export function NotificationList() {
  const notificationCount = MOCK_NOTIFICATIONS.length;
  const { listRef, showOverlay } = useScrollOverlay();

  return (
    <Card className={styles.card}>
      <h3 className={styles.title}>
        알림 <span className={styles.count}>{notificationCount}</span>
      </h3>
      <div className={styles.tableContainer}>
        <div ref={listRef} className={styles.listWrapper}>
          <table className={styles.table}>
            <thead className={styles.header}>
              <tr>
                <th className={styles.headerLabel}>일자</th>
                <th className={styles.headerLabel}>내용</th>
              </tr>
            </thead>
            <tbody className={styles.list}>
              {notificationCount === 0 ? (
                <tr>
                  <td colSpan={2}>
                    <div className={styles.emptyState}>
                      <p className={styles.emptyMessage}>알림이 없습니다.</p>
                    </div>
                  </td>
                </tr>
              ) : (
                MOCK_NOTIFICATIONS.map((notification) => (
                  <tr key={notification.id} className={styles.item}>
                    <td className={styles.date}>{notification.date}</td>
                    <td className={styles.content}>{notification.content}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
        {showOverlay && <div className={styles.fadeOverlay} />}
      </div>
    </Card>
  );
}
