import type { RoomItem } from './types';

// 12개의 다양한 색상 배열
const pastelColors = [
  '#FFB3BA', // 핑크
  '#BAFFC9', // 민트 그린
  '#BAE1FF', // 스카이 블루
  '#FFFFBA', // 옐로우
  '#FFDFBA', // 피치
  '#E0BBE4', // 라벤더
  '#FEC8D8', // 로즈
  '#D0F0C0', // 라이트 그린
  '#B8E0D2', // 틸 그린
  '#C7CEEA', // 퍼플 블루
  '#E8D5C4', // 베이지
  '#D3D3D3', // 라이트 그레이
];

// 기본 방/구역 데이터
export const defaultRooms: RoomItem[] = [
  { id: '1', name: '간호준비실', team: '간호팀', color: pastelColors[0] },
  { id: '2', name: '1인 시술실 1', team: '간호팀', color: pastelColors[1] },
  { id: '3', name: '1인 시술실 2', team: '간호팀', color: pastelColors[2] },
  { id: '4', name: '3인 시술실 1', team: '간호팀', color: pastelColors[3] },
  { id: '5', name: '레이저실 1', team: '코디팀', color: pastelColors[4] },
  { id: '6', name: '레이저실 2', team: '코디팀', color: pastelColors[5] },
  { id: '7', name: '레이저실 3', team: '코디팀', color: pastelColors[6] },
  { id: '8', name: '레이저실 4', team: '코디팀', color: pastelColors[7] },
  { id: '9', name: '관리준비실', team: '관리팀', color: pastelColors[8] },
  { id: '10', name: '관리실 1', team: '관리팀', color: pastelColors[9] },
  { id: '11', name: '안내데스크', team: '관리팀', color: pastelColors[10] },
  { id: '12', name: '', team: undefined, color: pastelColors[11] }, // 빈 칸
];

export const tabs = ['전체', '간호팀', '관리팀', '코디팀', '실장팀'];

