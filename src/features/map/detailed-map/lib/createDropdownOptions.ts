import { MOCK_LOCATIONS } from '@/features/map/inventory-map/model/mocks';

// TODO: API 연동 후 수정 - Set로 중복 제거 로직
export function createDropdownOptions() {
  const allNames = MOCK_LOCATIONS.map((location) => location.name);
  const uniqueNames = Array.from(new Set(allNames));
  
  return [
    { id: 'all', label: '전체' },
    ...uniqueNames.map((name, index) => ({
      id: `option-${index}`,
      label: name,
    })),
  ];
}

