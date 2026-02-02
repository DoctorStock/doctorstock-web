import clsx from 'clsx';
import { Card } from '@/shared/ui/card';
import { useDragSwap } from '@/shared/hooks/useDragSwap';
import { TABS } from '../config/tabs';
import { useInventoryMap } from '../model/useInventoryMap';
import type { InventoryMapConfig } from '../model/types';
import styles from './InventoryMap.module.css';

export function InventoryMap({ selectedLocation, onLocationClick, onTabChange, onSettingsClick, hasActiveFilters = false }: InventoryMapConfig) {
  const { selectedTab, displayedLocations, hasLocations, handleTabChange, handleLocationDrop } =
    useInventoryMap(onTabChange);
  const { handleDragStart, handleDragOver, handleDrop } = useDragSwap({
    type: 'inventory-location',
    onSwap: handleLocationDrop,
  });

  return (
    <Card className={styles.card}>
      <div className={styles.header}>
        <h3 className={clsx(styles.title, hasActiveFilters && styles.titleActive)}>재고지도</h3>
        {hasLocations && (
          <div className={styles.tabs}>
            {TABS.map((tab) => (
              <button
                key={tab.id}
                className={clsx(styles.tab, selectedTab === tab.id && styles.active)}
                onClick={() => handleTabChange(tab.id)}
              >
                {tab.label}
              </button>
            ))}
          </div>
        )}
        <button 
          className={styles.settingsButton} 
          aria-label="설정"
          onClick={onSettingsClick}
        >
          설정
          <img src="/assets/right-arrow.svg" alt="" width={12} height={12} />
        </button>
      </div>
      {hasLocations ? (
        <>
          <div className={styles.content}>
            <div className={styles.grid}>
              {displayedLocations.map((location, index) => (
                <div
                  key={location?.id || `empty-${index}`}
                  className={clsx(
                    styles.locationCard,
                    !location && styles.empty,
                    location && selectedLocation?.id === location.id && styles.active
                  )}
                  onClick={() => {
                    if (!location) return;
                    const isSelected = selectedLocation?.id === location.id;
                    onLocationClick(isSelected ? null : location);
                  }}
                  draggable={Boolean(location)}
                  onDragStart={location ? handleDragStart(index) : undefined}
                  onDragOver={handleDragOver}
                  onDrop={handleDrop(index)}
                >
                  {location && (
                    <>
                      <div className={styles.team}>{location.team}</div>
                      <div className={styles.name}>{location.name}</div>
                    </>
                  )}
                </div>
              ))}
            </div>
          </div>
        </>
      ) : (
        <div className={styles.emptyState}>
          <p className={styles.emptyDescription}>재고지도가 없습니다.<br/>재고지도를 만들어 재고를 한 눈에 관리하세요!</p>
          <button className={styles.createButton}>재고지도 만들기</button>
        </div>
      )}
    </Card>
  );
}