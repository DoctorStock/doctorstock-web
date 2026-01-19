import { Card } from '@/shared/ui/card';
import { useDetailedMap } from '../model/useDetailedMap';
import type { DetailedMap } from '../model/types';
import styles from './DetailedMap.module.css';

// TODO: 해당 브랜치 살리기 위한 커밋, 나중에 지울것
export function DetailedMap({ selectedLocation }: DetailedMap) {
  const locationDetail = useDetailedMap(selectedLocation);

  return (
    <Card className={styles.card}>
      <div className={styles.header}>
        <h3 className={styles.title}>상세지도</h3>
      </div>
      <div className={styles.content}>
        {locationDetail ? (
          <>
            <div className={styles.itemList}>
              {locationDetail.items.map((item) => (
                <div key={item.id} className={styles.itemCard}>
                  <span className={styles.itemName}>{item.name}</span>
                  <span className={styles.itemQuantity}>{item.quantity}개</span>
                </div>
              ))}
            </div>
          </>
        ) : (
          <div className={styles.emptyState}>재고지도에서 위치 박스를 눌러<br/> 상세 위치를 확인해 보세요.</div>
        )}
      </div>
    </Card>
  );
}
