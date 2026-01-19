import { useState } from 'react';
import { InventoryMap } from '@/features/map/inventory-map';
import type { Location } from '@/features/map/inventory-map/model/mocks';
import styles from './InventoryMapWidget.module.css';

export function InventoryMapWidget() {
  const [selectedLocation, setSelectedLocation] = useState<Location | null>(null);

  return (
    <div className={styles.container}>
      <InventoryMap
        selectedLocation={selectedLocation}
        onLocationClick={setSelectedLocation}
        onTabChange={() => setSelectedLocation(null)}
      />
    </div>
  );
}