import type { Location } from './mocks';

export interface InventoryMapProps {
  selectedLocation?: Location | null;
  onLocationClick: (location: Location | null) => void;
  onTabChange?: () => void;
}

