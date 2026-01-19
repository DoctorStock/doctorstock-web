import type { Location } from '@/features/map/inventory-map/model/mocks';
import { MOCK_LOCATION_DETAILS } from './mocks';
import type { LocationDetail } from './mocks';

export function useDetailedMap(selectedLocation: Location | null): LocationDetail | null {
  return selectedLocation ? MOCK_LOCATION_DETAILS[selectedLocation.id] || null : null;
}

