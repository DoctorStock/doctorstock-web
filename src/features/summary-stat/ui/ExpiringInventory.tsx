import styles from './ExpiringInventory.module.css';
import { Card } from '@/shared/ui/card';
import { MOCK_EXPIRING_INVENTORY } from '../model/mocks';

export function ExpiringInventory() {
  const { value } = MOCK_EXPIRING_INVENTORY;

  return (
    <Card className={styles.card}>
      <div className={styles.header}>
        <div className={styles.titleSection}>
          <img src="/assets/box_black.svg" alt="재고" width={20} height={20} />
          <span className={styles.title}>유통기한 임박재고</span>
        </div>
        <button className={styles.moreButton}>더보기</button>
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

