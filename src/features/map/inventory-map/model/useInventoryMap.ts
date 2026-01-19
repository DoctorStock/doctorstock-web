import { useState, useMemo } from 'react';
import { MOCK_LOCATIONS } from './mocks';
import { TABS, GRID_SIZE } from '../config/tabs';

export function useInventoryMap(onTabChange?: () => void) {
  const [selectedTab, setSelectedTab] = useState<string>('all');

  const { displayedLocations, hasLocations } = useMemo(() => {
    let filteredLocations: typeof MOCK_LOCATIONS;
    
    if (selectedTab === 'all') {
      filteredLocations = MOCK_LOCATIONS;
    } else {
      const tab = TABS.find((t) => t.id === selectedTab);
      const teamName = tab?.label || '';
      filteredLocations = MOCK_LOCATIONS.filter((location) => location.team === teamName);
    }

    const hasLocations = filteredLocations.length > 0;

    // 4x3 grid 유지
    const locations: (typeof MOCK_LOCATIONS[0] | null)[] = Array.from(
      { length: GRID_SIZE },
      (_, index) => filteredLocations[index] ?? null
    );
    
    return { displayedLocations: locations, hasLocations };
  }, [selectedTab]);

  // 탭 변경 시 초기화
  const handleTabChange = (tabId: string) => {
    // 같은 탭을 다시 클릭했을 때는 초기화하지 않음
    if (selectedTab !== tabId) {
      setSelectedTab(tabId);
      onTabChange?.();
    }
  };

  return { selectedTab, displayedLocations, hasLocations, handleTabChange };
}