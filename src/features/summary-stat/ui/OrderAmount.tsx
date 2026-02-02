import styles from './OrderAmount.module.css';
import { Card } from '@/shared/ui/card';
import { Tooltip } from '@/shared/ui/tooltip';
import { MOCK_ORDER_AMOUNT } from '../model/mocks';

export function OrderAmount() {
  const { value, change } = MOCK_ORDER_AMOUNT;

  return (
    <Card className={styles.card}>
      <div className={styles.header}>
        <div className={styles.titleSection}>
          <img src="/assets/box_black.svg" alt="주문" width={20} height={20} />
          <span className={styles.title}>이번 달 주문액</span>
          <Tooltip text="주문완료 처리 제품의 총액">
            <button className={styles.helpButton} aria-label="도움말">
              <img src="/assets/help.svg" alt="도움말" width={16} height={16} />
            </button>
          </Tooltip>
        </div>
        <button className={styles.moreButton}>더보기</button>
      </div>
      
      <div className={styles.content}>
        <div className={styles.amount}>
          <span className={styles.value}>{value !== null ? value.toLocaleString() : '-'}</span>
          <span className={styles.unit}>만원</span>
        </div>
        {change && (
          <div className={styles.change}>
            <span className={styles.changeLabel}>지난달 대비</span>
            <span className={styles.changeValue}>{Math.abs(change)}% {change > 0 ? '상승' : '하락'}</span>
          </div>
        )}
      </div>
    </Card>
  );
}
