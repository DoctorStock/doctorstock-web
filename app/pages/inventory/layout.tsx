// layout.tsx 파일은 레이아웃을 설정하는 파일
// 이 파일은 모든 입고 관련 페이지의 상위 레이아웃을 정의
// React.ReactNode는 리액트 노드를 의미하는 타입
// children은 입고 관련 페이지의 하위 레이아웃을 의미하는 타입
export default function InventoryLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="inventory-layout">
      <main className="inventory-main">
        {children}
      </main>
    </div>
  );
}