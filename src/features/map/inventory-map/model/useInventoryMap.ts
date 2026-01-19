import { useEffect, useMemo, useState } from 'react';
import { MOCK_LOCATIONS } from './mocks';
import { TABS, GRID_SIZE } from '../config/tabs';

export function useInventoryMap(onTabChange?: () => void) {
  const [selectedTab, setSelectedTab] = useState<string>('all');
  const [gridLocations, setGridLocations] = useState<(typeof MOCK_LOCATIONS[0] | null)[]>([]);
  const filteredLocations = useMemo(() => {
    if (selectedTab === 'all') return MOCK_LOCATIONS;
    
    const tab = TABS.find((t) => t.id === selectedTab);
    const teamName = tab?.label || '';

    return MOCK_LOCATIONS.filter((location) => location.team === teamName);
  }, [selectedTab]);

  const hasLocations = filteredLocations.length > 0;

  useEffect(() => {
    // 필터 변경 시 재구성
    const locations: (typeof MOCK_LOCATIONS[0] | null)[] = Array.from(
      { length: GRID_SIZE },
      (_, index) => filteredLocations[index] ?? null
    );
    setGridLocations(locations);
  }, [filteredLocations]);

  // 탭 변경 시 초기화
  const handleTabChange = (tabId: string) => {
    // 같은 탭을 다시 클릭했을 때는 초기화하지 않음
    if (selectedTab !== tabId) {
      setSelectedTab(tabId);
      onTabChange?.();
    }
  };

  const handleLocationDrop = (fromIndex: number, toIndex: number) => {
    // 인덱스 기준으로 swap
    setGridLocations((prev) => {
      const next = [...prev];
      [next[fromIndex], next[toIndex]] = [next[toIndex], next[fromIndex]];
      return next;
    });
  };

  return { selectedTab, displayedLocations: gridLocations, hasLocations, handleTabChange, handleLocationDrop };
}