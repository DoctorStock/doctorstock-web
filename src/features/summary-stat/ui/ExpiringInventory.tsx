import { Card } from '@/shared/ui/card';
import styles from './ExpiringInventory.module.css';

export function ExpiringInventory() {
  return (
    <Card className={styles.card}>
      <div className={styles.header}>
        <div className={styles.titleSection}>
          <img src="/assets/box.svg" alt="재고" width={20} height={20} />
          <span className={styles.title}>유통기한 임박재고</span>
        </div>
        <button className={styles.moreButton}>더보기</button>
      </div>
      
      <div className={styles.content}>
        <div className={styles.amount}>
          <span className={styles.value}>2</span>
          <span className={styles.unit}>개</span>
        </div>
      </div>
    </Card>
  );
}

