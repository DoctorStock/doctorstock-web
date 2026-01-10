import { Card } from '@/shared/ui/card';
import styles from './NeedsOrder.module.css';

export function NeedsOrder() {
  return (
    <Card className={styles.card}>
      <div className={styles.header}>
        <div className={styles.titleSection}>
          <img src="/assets/box.svg" alt="재고" width={20} height={20} />
          <span className={styles.title}>주문 필요 재고</span>
        </div>
      </div>
      
      <div className={styles.content}>
        <div className={styles.amount}>
          <span className={styles.value}>5555</span>
          <span className={styles.unit}>개</span>
        </div>
      </div>
    </Card>
  );
}

