export interface Location {
  id: string;
  team: string;
  name: string;
}

export const MOCK_LOCATIONS: Location[] = [
  { id: 'location-1', team: '간호팀', name: '간호준비실' },
  { id: 'location-2', team: '간호팀', name: '1인 시술실 1' },
  { id: 'location-3', team: '간호팀', name: '1인 시술실 2' },
  { id: 'location-4', team: '간호팀', name: '3인 시술실 1' },
  { id: 'location-5', team: '코디팀', name: '레이저실 1' },
  { id: 'location-6', team: '코디팀', name: '레이저실 2' },
  { id: 'location-7', team: '코디팀', name: '레이저실 3' },
  { id: 'location-8', team: '코디팀', name: '레이저실 4' },
  { id: 'location-9', team: '실장팀', name: '안내데스크' },
  { id: 'location-10', team: '관리팀', name: '사무실 1' },
  { id: 'location-11', team: '관리팀', name: '사무실 2' },
];