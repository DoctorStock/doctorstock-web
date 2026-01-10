import { useState } from 'react';
import type { RoomItem } from '../model/types';
import { defaultRooms, tabs } from '../model/mocks';
import styles from './InventoryMap.module.css';

interface InventoryMapProps {
  onRoomSelect?: (room: RoomItem) => void;
}

export function InventoryMap({ onRoomSelect }: InventoryMapProps) {
  const [activeTab, setActiveTab] = useState('전체');
  const [rooms, setRooms] = useState<RoomItem[]>(defaultRooms);
  const [draggedItem, setDraggedItem] = useState<string | null>(null);
  const [dragOverIndex, setDragOverIndex] = useState<number | null>(null);

  // 필터링된 방 목록 - 선택한 팀의 카드만 보이고 나머지는 표시하지 않음
  const filteredRooms = (() => {
    if (activeTab === '전체') {
      return rooms;
    }
    
    // 해당 팀의 카드만 필터링
    const teamRooms = rooms.filter((room) => room.team === activeTab);
    
    // 12칸 그리드를 유지하기 위해 빈 칸으로 채우지만, 투명하게 처리
    const emptySlot: RoomItem = { id: 'empty', name: '', team: undefined, color: 'transparent' };
    const filledRooms = [...teamRooms, ...Array(12 - teamRooms.length).fill(null).map((_, i) => ({ ...emptySlot, id: `empty-${i}` }))];
    
    return filledRooms.slice(0, 12);
  })();

  // 드래그 시작
  const handleDragStart = (e: React.DragEvent, roomId: string) => {
    setDraggedItem(roomId);
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/plain', '');
  };

  // 드래그 오버 (드롭 대상 위치 하이라이트)
  const handleDragOver = (e: React.DragEvent, index: number) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
    if (draggedItem !== null) {
      setDragOverIndex(index);
    }
  };

  // 드래그 리브 (하이라이트 제거)
  const handleDragLeave = (e: React.DragEvent) => {
    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
    const x = e.clientX;
    const y = e.clientY;

    if (x < rect.left || x > rect.right || y < rect.top || y > rect.bottom) {
      setDragOverIndex(null);
    }
  };

  // 드롭 처리
  const handleDrop = (e: React.DragEvent, targetIndex: number) => {
    e.preventDefault();

    if (!draggedItem) return;

    // filteredRooms에서 실제 인덱스 찾기 (빈 칸 제외)
    const draggedRoomInFiltered = filteredRooms.find((room) => room.id === draggedItem);
    if (!draggedRoomInFiltered || !draggedRoomInFiltered.name) {
      setDragOverIndex(null);
      return;
    }

    // 원본 rooms 배열에서 찾기
    const draggedIndex = rooms.findIndex((room) => room.id === draggedItem);
    const targetRoomInFiltered = filteredRooms[targetIndex];
    
    if (draggedIndex === -1) {
      setDragOverIndex(null);
      return;
    }

    // 빈 칸에 드롭하는 경우는 무시
    if (!targetRoomInFiltered.name) {
      setDragOverIndex(null);
      return;
    }

    const targetIndexInRooms = rooms.findIndex((room) => room.id === targetRoomInFiltered.id);
    
    if (draggedIndex === targetIndexInRooms || targetIndexInRooms === -1) {
      setDragOverIndex(null);
      return;
    }

    // 두 아이템의 위치를 직접 교환
    const newRooms = [...rooms];
    const draggedRoom = newRooms[draggedIndex];
    const targetRoom = newRooms[targetIndexInRooms];

    newRooms[draggedIndex] = targetRoom;
    newRooms[targetIndexInRooms] = draggedRoom;

    setRooms(newRooms);
    setDraggedItem(null);
    setDragOverIndex(null);
  };

  // 드래그 종료
  const handleDragEnd = () => {
    setDraggedItem(null);
    setDragOverIndex(null);
  };

  const handleRoomClick = (room: RoomItem) => {
    if (room.name && onRoomSelect) {
      onRoomSelect(room);
    }
  };

  return (
    <div className={styles.inventoryMapSection}>
      <div className={styles.header}>
        <h2 className={styles.sectionTitle}>재고 지도</h2>
        <select className={styles.dropdown} defaultValue="전체">
          <option value="전체">전체</option>
        </select>
      </div>

      {/* 탭 메뉴 */}
      <div className={styles.tabs}>
        {tabs.map((tab) => (
          <button
            key={tab}
            className={`${styles.tab} ${activeTab === tab ? styles.tabActive : ''}`}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* 4x3 그리드 */}
      <div className={styles.grid}>
        {filteredRooms.map((room, index) => {
          const isDragging = draggedItem === room.id;
          const isDragOver = dragOverIndex === index && draggedItem !== null && draggedItem !== room.id;
          const isEmpty = !room.name;

          return (
            <div
              key={room.id}
              className={`${styles.gridItem} ${isDragging ? styles.dragging : ''} ${isDragOver ? styles.dragOver : ''} ${isEmpty ? styles.empty : ''}`}
              style={{
                backgroundColor: room.color,
                position: 'relative',
                zIndex: isDragOver ? 2 : 1,
              }}
              draggable={!isEmpty}
              onDragStart={(e) => handleDragStart(e, room.id)}
              onDragOver={(e) => handleDragOver(e, index)}
              onDragLeave={handleDragLeave}
              onDrop={(e) => handleDrop(e, index)}
              onDragEnd={handleDragEnd}
              onClick={() => handleRoomClick(room)}
            >
              {room.team && <div className={styles.teamLabel}>{room.team}</div>}
              {room.name && <div className={styles.roomName}>{room.name}</div>}
            </div>
          );
        })}
      </div>
    </div>
  );
}

