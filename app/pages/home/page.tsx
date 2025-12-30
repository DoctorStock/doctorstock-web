"use client";

import { useState } from "react";
import styles from "./page.module.css";

// 방/구역 데이터 타입
interface RoomItem {
  id: string;
  name: string;
  team?: string; // 간호팀, 관리팀, 코디팀, 실장팀
  color: string; // 각 아이템의 고유 색상
}

// 12개의 다양한 색상 배열
const pastelColors = [
  "#FFB3BA", // 핑크
  "#BAFFC9", // 민트 그린
  "#BAE1FF", // 스카이 블루
  "#FFFFBA", // 옐로우
  "#FFDFBA", // 피치
  "#E0BBE4", // 라벤더
  "#FEC8D8", // 로즈
  "#D0F0C0", // 라이트 그린
  "#B8E0D2", // 틸 그린
  "#C7CEEA", // 퍼플 블루
  "#E8D5C4", // 베이지
  "#D3D3D3", // 라이트 그레이
];

// 기본 방/구역 데이터 (이미지 참고)
const defaultRooms: RoomItem[] = [
  { id: "1", name: "간호준비실", team: "간호팀", color: pastelColors[0] },
  { id: "2", name: "1인 시술실 1", team: "간호팀", color: pastelColors[1] },
  { id: "3", name: "3인 시술실 1", team: "간호팀", color: pastelColors[2] },
  { id: "4", name: "관리준비실", team: "관리팀", color: pastelColors[3] },
  { id: "5", name: "레이저실 1", team: "코디팀", color: pastelColors[4] },
  { id: "6", name: "레이저실 2", team: "코디팀", color: pastelColors[5] },
  { id: "7", name: "레이저실 3", team: "코디팀", color: pastelColors[6] },
  { id: "8", name: "레이저실 4", team: "코디팀", color: pastelColors[7] },
  { id: "9", name: "관리실 1", team: "관리팀", color: pastelColors[8] },
  { id: "10", name: "안내데스크", team: "관리팀", color: pastelColors[9] },
  { id: "11", name: "창고", team: "관리팀", color: pastelColors[10] },
  { id: "12", name: "", team: undefined, color: pastelColors[11] }, // 빈 칸
];

const tabs = ["전체", "간호팀", "관리팀", "코디팀", "실장팀"];

export default function Home() {
  const [activeTab, setActiveTab] = useState("전체");
  const [rooms, setRooms] = useState<RoomItem[]>(defaultRooms);
  const [draggedItem, setDraggedItem] = useState<string | null>(null);
  const [dragOverIndex, setDragOverIndex] = useState<number | null>(null);
  const [categories, setCategories] = useState<string[]>(["H", "I", "J", "K"]);
  const [draggedCategory, setDraggedCategory] = useState<string | null>(null);
  const [dragOverCategoryIndex, setDragOverCategoryIndex] = useState<number | null>(null);
  
  // 카테고리별 테두리 색상
  const categoryBorderColors = {
    H: "#FF6B6B", // 빨간색
    I: "#4ECDC4", // 청록색
    J: "#45B7D1", // 파란색
    K: "#FFA07A", // 연어색
  };

  // 드래그 시작
  const handleDragStart = (e: React.DragEvent, roomId: string) => {
    setDraggedItem(roomId);
    e.dataTransfer.effectAllowed = "move";
    // 드래그 이미지 커스터마이징
    e.dataTransfer.setData("text/plain", "");
  };

  // 드래그 오버 (드롭 대상 위치 하이라이트)
  const handleDragOver = (e: React.DragEvent, index: number) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
    if (draggedItem !== null) {
      setDragOverIndex(index);
    }
  };

  // 드래그 리브 (하이라이트 제거)
  const handleDragLeave = (e: React.DragEvent) => {
    // 자식 요소로 이동하는 경우는 제외
    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
    const x = e.clientX;
    const y = e.clientY;
    
    if (
      x < rect.left ||
      x > rect.right ||
      y < rect.top ||
      y > rect.bottom
    ) {
      setDragOverIndex(null);
    }
  };

  // 드롭 처리
  const handleDrop = (e: React.DragEvent, targetIndex: number) => {
    e.preventDefault();
    
    if (!draggedItem) return;

    const draggedIndex = rooms.findIndex((room) => room.id === draggedItem);
    if (draggedIndex === -1 || draggedIndex === targetIndex) {
      setDragOverIndex(null);
      return;
    }

    // 두 아이템의 위치를 직접 교환
    const newRooms = [...rooms];
    const draggedRoom = newRooms[draggedIndex];
    const targetRoom = newRooms[targetIndex];
    
    newRooms[draggedIndex] = targetRoom;
    newRooms[targetIndex] = draggedRoom;

    setRooms(newRooms);
    setDraggedItem(null);
    setDragOverIndex(null);
  };

  // 드래그 종료
  const handleDragEnd = () => {
    setDraggedItem(null);
    setDragOverIndex(null);
  };

  // 카테고리 드래그 시작
  const handleCategoryDragStart = (e: React.DragEvent, category: string) => {
    setDraggedCategory(category);
    e.dataTransfer.effectAllowed = "move";
    e.dataTransfer.setData("text/plain", "");
  };

  // 카테고리 드래그 오버
  const handleCategoryDragOver = (e: React.DragEvent, index: number) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
    if (draggedCategory !== null) {
      setDragOverCategoryIndex(index);
    }
  };

  // 카테고리 드래그 리브
  const handleCategoryDragLeave = (e: React.DragEvent) => {
    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
    const x = e.clientX;
    const y = e.clientY;
    
    if (
      x < rect.left ||
      x > rect.right ||
      y < rect.top ||
      y > rect.bottom
    ) {
      setDragOverCategoryIndex(null);
    }
  };

  // 카테고리 드롭 처리
  const handleCategoryDrop = (e: React.DragEvent, targetIndex: number) => {
    e.preventDefault();
    
    if (!draggedCategory) return;

    const draggedIndex = categories.findIndex((cat) => cat === draggedCategory);
    if (draggedIndex === -1 || draggedIndex === targetIndex) {
      setDragOverCategoryIndex(null);
      return;
    }

    // 두 카테고리의 위치를 직접 교환
    const newCategories = [...categories];
    const draggedCat = newCategories[draggedIndex];
    const targetCat = newCategories[targetIndex];
    
    newCategories[draggedIndex] = targetCat;
    newCategories[targetIndex] = draggedCat;

    setCategories(newCategories);
    setDraggedCategory(null);
    setDragOverCategoryIndex(null);
  };

  // 카테고리 드래그 종료
  const handleCategoryDragEnd = () => {
    setDraggedCategory(null);
    setDragOverCategoryIndex(null);
  };

  return (
    <div className={styles.container}>
      {/* 상단 지표 카드들 (4개 같은 크기) */}
      <div className={styles.metricsGrid}>
        <div className={styles.metricCard}>A</div>
        <div className={styles.metricCard}>B</div>
        <div className={styles.metricCard}>C</div>
        <div className={styles.metricCard}>D</div>
      </div>

      {/* 메인 콘텐츠 영역: 왼쪽(검색+지도) + 오른쪽(알림+입고대기) */}
      <div className={styles.mainContentArea}>
        {/* 왼쪽 영역: 검색 + 지도 (지표 3개 넓이) */}
        <div className={styles.leftContentArea}>
          {/* 검색 영역 */}
          <div className={styles.searchArea}>
            <input 
              type="text" 
              className={styles.searchInput}
              placeholder="Q 물품 이름을 검색하세요."
            />
            <button className={styles.filterBtn}>
              <svg 
                width="20" 
                height="20" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2"
              >
                <path d="M22 3H2L10 12.46V19L14 21V12.46L22 3Z" />
              </svg>
            </button>
            <button className={styles.favoriteBtn}>
              <svg 
                width="20" 
                height="20" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2"
              >
                <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
              </svg>
            </button>
          </div>

          {/* 지도 영역 (재고 지도 2/3 + 상세 재고 지도 1/3) */}
          <div className={styles.mapsArea}>
          {/* 재고 지도 섹션 (2/3) */}
          <div className={styles.inventoryMapSection}>
            <h2 className={styles.sectionTitle}>재고 지도</h2>
            
            {/* 탭 메뉴 */}
            <div className={styles.tabs}>
              {tabs.map((tab) => (
                <button
                  key={tab}
                  className={`${styles.tab} ${activeTab === tab ? styles.tabActive : ""}`}
                  onClick={() => setActiveTab(tab)}
                >
                  {tab}
                </button>
              ))}
            </div>

            {/* 4x3 그리드 */}
            <div className={styles.grid}>
              {rooms.map((room, index) => {
                const isDragging = draggedItem === room.id;
                const isDragOver = dragOverIndex === index && draggedItem !== null && draggedItem !== room.id;
                const isEmpty = !room.name;
                
                return (
                  <div
                    key={room.id}
                    className={`${styles.gridItem} ${
                      isDragging ? styles.dragging : ""
                    } ${
                      isDragOver ? styles.dragOver : ""
                    } ${
                      isEmpty ? styles.empty : ""
                    }`}
                    style={{ backgroundColor: room.color, position: "relative", zIndex: isDragOver ? 2 : 1 }}
                    draggable={true}
                    onDragStart={(e) => handleDragStart(e, room.id)}
                    onDragOver={(e) => handleDragOver(e, index)}
                    onDragLeave={handleDragLeave}
                    onDrop={(e) => handleDrop(e, index)}
                    onDragEnd={handleDragEnd}
                  >
                    {room.name || ""}
                  </div>
                );
              })}
            </div>
          </div>

          {/* 상세 재고 지도 섹션 (1/3) */}
          <div className={styles.detailedMapCard}>
            E
          </div>
          </div>
        </div>

        {/* 오른쪽 영역: 알림 + 입고대기 (지표 1개 넓이) */}
        <div className={styles.rightContentArea}>
          {/* 알림 섹션 */}
          <div className={styles.notificationCard}>
            F
          </div>

          {/* 입고대기 섹션 */}
          <div className={styles.notificationCard}>
            G
          </div>
        </div>
      </div>

      {/* 하단 재고 카테고리 섹션 */}
      <div className={styles.inventoryCategories}>
        {categories.map((category, index) => {
          const isDragging = draggedCategory === category;
          const isDragOver = dragOverCategoryIndex === index && draggedCategory !== null && draggedCategory !== category;
          const borderColor = categoryBorderColors[category as keyof typeof categoryBorderColors];
          
          return (
            <div
              key={category}
              className={`${styles.categoryCard} ${
                isDragging ? styles.dragging : ""
              } ${
                isDragOver ? styles.dragOver : ""
              }`}
              style={{ 
                position: "relative", 
                zIndex: isDragOver ? 2 : 1,
                borderColor: borderColor
              }}
              draggable={true}
              onDragStart={(e) => handleCategoryDragStart(e, category)}
              onDragOver={(e) => handleCategoryDragOver(e, index)}
              onDragLeave={handleCategoryDragLeave}
              onDrop={(e) => handleCategoryDrop(e, index)}
              onDragEnd={handleCategoryDragEnd}
            >
              {category}
            </div>
          );
        })}
      </div>
    </div>
  );
}
