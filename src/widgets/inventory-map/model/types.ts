export interface RoomItem {
  id: string;
  name: string;
  team?: string; // 간호팀, 관리팀, 코디팀, 실장팀
  color: string; // 각 아이템의 고유 색상
}

