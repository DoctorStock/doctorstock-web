import styles from './NeedsOrder.module.css';
import { Card } from '@/shared/ui/card';
import { MOCK_NEEDS_ORDER } from '../model/mocks';

export function NeedsOrder() {
  const { value } = MOCK_NEEDS_ORDER;

  return (
    <Card className={styles.card}>
      <div className={styles.header}>
        <div className={styles.titleSection}>
          <img src="/assets/box_black.svg" alt="재고" width={20} height={20} />
          <span className={styles.title}>주문 필요 재고</span>
        </div>
      </div>
      
      <div className={styles.content}>
        <div className={styles.amount}>
          <span className={styles.value}>{value !== null ? value.toLocaleString() : '-'}</span>
          <span className={styles.unit}>개</span>
        </div>
      </div>
    </Card>
  );
}
