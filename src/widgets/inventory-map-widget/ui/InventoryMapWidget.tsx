import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { InventoryMap } from '@/features/map/inventory-map';
import { DetailedMap } from '@/features/map/detailed-map';
import type { Location } from '@/features/map/inventory-map/model/mocks';
import styles from './InventoryMapWidget.module.css';

interface InventoryMapWidget {
  hasActiveFilters?: boolean;
}

export function InventoryMapWidget({ hasActiveFilters = false }: InventoryMapWidget) {
  const navigate = useNavigate();
  const [selectedLocation, setSelectedLocation] = useState<Location | null>(null);

  return (
    <div className={styles.container}>
      <InventoryMap
        selectedLocation={selectedLocation}
        onLocationClick={setSelectedLocation}
        onTabChange={() => setSelectedLocation(null)}
        onSettingsClick={() => navigate('/settings')}
        hasActiveFilters={hasActiveFilters}
      />
      <DetailedMap selectedLocation={selectedLocation} />
    </div>
  );
}