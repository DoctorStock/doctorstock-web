import { Card } from '@/shared/ui/card';
import { MOCK_INBOUND_WAITING } from '../model/mocks';
import { useInboundWaiting } from '../model/useInboundWaiting';
import { useScrollOverlay } from '@/shared/hooks/useScrollOverlay';
import styles from './InboundWaitingList.module.css';

export function InboundWaitingList() {
  const inboundWaitingCount = MOCK_INBOUND_WAITING.length;
  const { listRef, showOverlay: _showOverlay } = useScrollOverlay();
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
                <th className={styles.headerLabel}>입고등록</th>
              </tr>
            </thead>
            <tbody className={styles.list}>
              {MOCK_INBOUND_WAITING.map((item) => (
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
              ))}
            </tbody>
          </table>
          {/* TODO: 스크롤 오버레이 추가 */}
          {/* {_showOverlay && <div className={styles.fadeOverlay} />} */}
        </div>
      </div>
    </Card>
  );
}
