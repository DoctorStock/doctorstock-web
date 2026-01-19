import type { Location } from './mocks';

export interface InventoryMapProps {
  selectedLocation?: Location | null;
  onLocationClick: (location: Location) => void;
  onTabChange?: () => void;
}

