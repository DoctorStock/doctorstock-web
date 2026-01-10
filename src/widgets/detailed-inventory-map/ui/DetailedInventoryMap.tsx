import { useState } from 'react';
import styles from './DetailedInventoryMap.module.css';

interface StorageItem {
  id: string;
  name: string;
  count: number;
}

const mockStorageItems: StorageItem[] = [
  { id: '1', name: '상부장 1', count: 3 },
  { id: '2', name: '상부장 2', count: 5 },
  { id: '3', name: '하부장 1', count: 2 },
  { id: '4', name: '하부장 2', count: 4 },
  { id: '5', name: '측면장 1', count: 1 },
  { id: '6', name: '측면장 2', count: 6 },
];

export function DetailedInventoryMap() {
  const [items] = useState<StorageItem[]>(mockStorageItems);

  return (
    <div className={styles.detailedMapCard}>
      <div className={styles.header}>
        <h2 className={styles.sectionTitle}>상세 재고 지도</h2>
        <select className={styles.dropdown} defaultValue="전체">
          <option value="전체">전체</option>
        </select>
      </div>

      <div className={styles.listContainer}>
        <div className={styles.list}>
          {items.map((item) => (
            <div key={item.id} className={styles.listItem}>
              <span className={styles.itemName}>{item.name}</span>
              <span className={styles.itemCount}>{item.count}개</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

