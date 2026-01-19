import type { Location } from '@/features/map/inventory-map/model/mocks';

export interface LocationItem {
  id: string;
  name: string;
  quantity: number;
}

export interface LocationDetail {
  location: Location;
  category: string;
  items: LocationItem[];
}

export const MOCK_LOCATION_DETAILS: Record<string, LocationDetail> = {
  'location-1': {
    location: { id: 'location-1', team: '간호팀', name: '간호준비실' },
    category: '전체',
    items: [
      { id: 'item-1', name: '상부장 1', quantity: 3 },
      { id: 'item-2', name: '상부장 2', quantity: 5 },
      { id: 'item-3', name: '하부장 1', quantity: 2 },
      { id: 'item-4', name: '냉장고 1', quantity: 1 },
      { id: 'item-5', name: '세척대 1', quantity: 2 },
    ],
  },
  'location-3': {
    location: { id: 'location-3', team: '간호팀', name: '1인 시술실 2' },
    category: '전체',
    items: [
      { id: 'item-9', name: '상부장 1', quantity: 2 },
      { id: 'item-10', name: '하부장 1', quantity: 1 },
      { id: 'item-11', name: '시술대 1', quantity: 1 },
      { id: 'item-12', name: '의자 1', quantity: 2 },
    ],
  },
  'location-4': {
    location: { id: 'location-4', team: '간호팀', name: '3인 시술실 1' },
    category: '전체',
    items: [
      { id: 'item-13', name: '상부장 1', quantity: 3 },
      { id: 'item-14', name: '상부장 2', quantity: 3 },
      { id: 'item-15', name: '하부장 1', quantity: 3 },
      { id: 'item-16', name: '시술대 1', quantity: 3 },
      { id: 'item-17', name: '의자 1', quantity: 6 },
      { id: 'item-18', name: '의자 2', quantity: 3 },
    ],
  },
  'location-5': {
    location: { id: 'location-5', team: '코디팀', name: '레이저실 1' },
    category: '전체',
    items: [
      { id: 'item-19', name: '레이저기기 1', quantity: 1 },
      { id: 'item-20', name: '시술대 1', quantity: 1 },
      { id: 'item-21', name: '냉장고 1', quantity: 1 },
    ],
  },
  'location-6': {
    location: { id: 'location-6', team: '코디팀', name: '레이저실 2' },
    category: '전체',
    items: [
      { id: 'item-22', name: '레이저기기 1', quantity: 1 },
      { id: 'item-23', name: '시술대 1', quantity: 1 },
    ],
  },
  'location-7': {
    location: { id: 'location-7', team: '코디팀', name: '레이저실 3' },
    category: '전체',
    items: [
      { id: 'item-24', name: '레이저기기 1', quantity: 1 },
      { id: 'item-25', name: '시술대 1', quantity: 1 },
      { id: 'item-26', name: '의자 1', quantity: 2 },
    ],
  },
  'location-8': {
    location: { id: 'location-8', team: '코디팀', name: '레이저실 4' },
    category: '전체',
    items: [
      { id: 'item-27', name: '레이저기기 1', quantity: 1 },
      { id: 'item-28', name: '시술대 1', quantity: 1 },
      { id: 'item-29', name: '냉장고 1', quantity: 1 },
      { id: 'item-30', name: '의자 1', quantity: 2 },
    ],
  },
  'location-9': {
    location: { id: 'location-9', team: '실장팀', name: '안내데스크' },
    category: '전체',
    items: [
      { id: 'item-31', name: '데스크 1', quantity: 1 },
      { id: 'item-32', name: '의자 1', quantity: 2 },
      { id: 'item-33', name: '서랍장 1', quantity: 2 },
    ],
  },
  'location-10': {
    location: { id: 'location-10', team: '관리팀', name: '사무실 1' },
    category: '전체',
    items: [
      { id: 'item-34', name: '책상 1', quantity: 2 },
      { id: 'item-35', name: '의자 1', quantity: 2 },
      { id: 'item-36', name: '서랍장 1', quantity: 1 },
      { id: 'item-37', name: '파일장 1', quantity: 1 },
    ],
  },
  'location-11': {
    location: { id: 'location-11', team: '관리팀', name: '사무실 2' },
    category: '전체',
    items: [
      { id: 'item-38', name: '책상 1', quantity: 1 },
      { id: 'item-39', name: '의자 1', quantity: 1 },
      { id: 'item-40', name: '서랍장 1', quantity: 1 },
    ],
  },
};

