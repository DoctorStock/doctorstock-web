import { OrderAmount, UsageAmount, ExpiringInventory, NeedsOrder } from '@/features/summary-stat';
import styles from './SummaryStats.module.css';

export function SummaryStats() {
  return (
    <div className={styles.container}>
      <OrderAmount />
      <UsageAmount />
      <ExpiringInventory />
      <NeedsOrder />
    </div>
  );
}
