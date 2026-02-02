import type { Location } from './mocks';

export interface InventoryMapConfig {
  selectedLocation?: Location | null;
  onLocationClick: (location: Location | null) => void;
  onTabChange?: () => void;
  onSettingsClick?: () => void;
  hasActiveFilters?: boolean;
}