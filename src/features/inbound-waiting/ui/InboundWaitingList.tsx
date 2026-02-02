import { Card } from '@/shared/ui/card';
import { MOCK_INBOUND_WAITING } from '../model/mocks';
import { useInboundWaiting } from '../model/useInboundWaiting';
import { useScrollOverlay } from '@/shared/hooks/useScrollOverlay';
import styles from './InboundWaitingList.module.css';

export function InboundWaitingList() {
  const inboundWaitingCount = MOCK_INBOUND_WAITING.length;
  const { listRef, showOverlay } = useScrollOverlay();
  const { handleRegister } = useInboundWaiting();

  return (
    <Card className={styles.card}>
      <h3 className={styles.title}>
        입고대기 <span className={styles.count}>{inboundWaitingCount}</span>
      </h3>
      <div className={styles.tableContainer}>
        <div ref={listRef} className={styles.listWrapper}>
          <table className={styles.table}>
            <thead className={styles.header}>
              <tr>
                <th className={styles.headerLabel}>일자</th>
                <th className={styles.headerLabel}>구매처</th>
                <th className={styles.headerLabel}>제품명</th>
                <th className={styles.headerLabel}>등록</th>
              </tr>
            </thead>
            <tbody className={styles.list}>
              {inboundWaitingCount === 0 ? (
                <tr>
                  <td colSpan={4}>
                    <div className={styles.emptyState}>
                      <p className={styles.emptyMessage}>입고 대기 목록이 없습니다.</p>
                    </div>
                  </td>
                </tr>
              ) : (
                MOCK_INBOUND_WAITING.map((item) => (
                  <tr key={item.id} className={styles.item}>
                    <td className={styles.date}>{item.date}</td>
                    <td className={styles.purchaser}>{item.purchaser}</td>
                    <td className={styles.productName}>{item.productName}</td>
                    <td className={styles.registerCell}>
                      <button className={styles.registerButton} onClick={() => handleRegister(item.id)}>
                        등록
                      </button>
                    </td>
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
