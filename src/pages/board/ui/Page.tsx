// export default function Board() {
//   return <div>게시판</div>;
// }

// TODO: empty case로 toggle 설정 - board 페이지 전용 wrapper (테스트용, 삭제 예정)
import { useMemo } from 'react';
import { SearchBar, useSearch } from '@/features/search';
import { FilterDialog, SelectedFilters, useFilter } from '@/features/filter';
import { Card } from '@/shared/ui/card';
import { Tooltip } from '@/shared/ui/tooltip';
import { ProductCategorySet, useToggleFavorite, useAddToCart, useProductUse } from '@/features/product-category-set';
import { useScrollOverlay } from '@/shared/hooks/useScrollOverlay';
import { useInboundWaiting } from '@/features/inbound-waiting/model/useInboundWaiting';
import { useCategoryOrder } from '@/widgets/product-categories/model/useCategoryOrder';
import { useDragSwap } from '@/shared/hooks/useDragSwap';
import { TABS, GRID_SIZE } from '@/features/map/inventory-map/config/tabs';
import clsx from 'clsx';
import type { InboundWaitingItem } from '@/features/inbound-waiting/model/types';
import type { Notification } from '@/features/notification/model/types';
import type { Product } from '@/entities/product';
import type { CategoryCard } from '@/widgets/product-categories/model/types';
import type { Location } from '@/features/map/inventory-map/model/mocks';
import type { LocationDetail } from '@/features/map/detailed-map/model/mocks';
import OrderAmountStyles from '@/features/summary-stat/ui/OrderAmount.module.css';
import UsageAmountStyles from '@/features/summary-stat/ui/UsageAmount.module.css';
import ExpiringInventoryStyles from '@/features/summary-stat/ui/ExpiringInventory.module.css';
import NeedsOrderStyles from '@/features/summary-stat/ui/NeedsOrder.module.css';
import NotificationListStyles from '@/features/notification/ui/NotificationList.module.css';
import InboundWaitingListStyles from '@/features/inbound-waiting/ui/InboundWaitingList.module.css';
import ProductCategoriesStyles from '@/widgets/product-categories/ui/ProductCategories.module.css';
import InventoryMapStyles from '@/features/map/inventory-map/ui/InventoryMap.module.css';
import DetailedMapStyles from '@/features/map/detailed-map/ui/DetailedMap.module.css';

const BOARD_EMPTY = {
  orderAmount: { value: null as number | null, change: null as number | null },
  usageAmount: { value: null as number | null, change: null as number | null },
  expiringInventory: { value: null as number | null },
  needsOrder: { value: null as number | null },
  inboundWaiting: [] as InboundWaitingItem[],
  notifications: [] as Notification[],
  locations: [] as never[],
  categories: [
    { id: 'category-1', title: '주사제', products: [] as Product[] },
    { id: 'category-2', title: '소모품', products: [] as Product[] },
    { id: 'category-3', title: '필러/보톡스/실', products: [] as Product[] },
  ] as CategoryCard[],
  sets: [] as Product[],
};

const pageStyles = {
  container: {
    backgroundColor: 'var(--gray-g100)',
    minHeight: '100vh',
    padding: 'var(--spacing-28) var(--spacing-24) 0',
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(4, minmax(0, 1fr))',
    gap: 'var(--spacing-16)',
    alignItems: 'stretch',
    minWidth: 0,
  },
  summaryRow: {
    gridColumn: '1 / -1',
  },
  main: {
    gridColumn: '1 / span 3',
    display: 'flex',
    flexDirection: 'column' as const,
    gap: 'var(--spacing-12)',
    minWidth: 0,
  },
  aside: {
    gridColumn: '4 / span 1',
    display: 'grid',
    gridTemplateRows: 'repeat(2, minmax(0, 1fr))',
    gap: 'var(--spacing-15)',
    minWidth: 0,
  },
  categoriesRow: {
    gridColumn: '1 / -1',
  },
} as const;

const componentStyles = {
  summaryStatsContainer: {
    display: 'grid',
    gridTemplateColumns: 'repeat(4, minmax(0, 1fr))',
    gap: 'var(--spacing-16)',
  },
  inventoryMapWidgetContainer: {
    display: 'grid',
    gridTemplateColumns: '2fr 1fr',
    gap: 0,
    minHeight: '460px',
  },
};

function useDetailedMap(): LocationDetail | null {
  return null;
}

function useInventoryMap() {
  return {
    selectedTab: 'all',
    displayedLocations: Array.from({ length: GRID_SIZE }, () => null) as (Location | null)[],
    hasLocations: false,
    handleTabChange: (_tabId: string) => {},
    handleLocationDrop: (_fromIndex: number, _toIndex: number) => {},
  };
}

function SummaryStats() {
  return (
    <div style={componentStyles.summaryStatsContainer}>
      <OrderAmount />
      <UsageAmount />
      <ExpiringInventory />
      <NeedsOrder />
    </div>
  );
}

function OrderAmount() {
  const { value, change } = BOARD_EMPTY.orderAmount;
  return (
    <Card className={OrderAmountStyles.card}>
      <div className={OrderAmountStyles.header}>
        <div className={OrderAmountStyles.titleSection}>
          <img src="/assets/box_black.svg" alt="주문" width={20} height={20} />
          <span className={OrderAmountStyles.title}>이번 달 주문액</span>
          <Tooltip text="주문완료 처리 제품의 총액">
            <button className={OrderAmountStyles.helpButton} aria-label="도움말">
              <img src="/assets/help.svg" alt="도움말" width={16} height={16} />
            </button>
          </Tooltip>
        </div>
        <button className={OrderAmountStyles.moreButton}>더보기</button>
      </div>
      <div className={OrderAmountStyles.content}>
        <div className={OrderAmountStyles.amount}>
          <span className={OrderAmountStyles.value}>{value !== null ? value.toLocaleString() : '-'}</span>
          <span className={OrderAmountStyles.unit}>만원</span>
        </div>
        {change && (
          <div className={OrderAmountStyles.change}>
            <span className={OrderAmountStyles.changeLabel}>지난달 대비</span>
            <span className={OrderAmountStyles.changeValue}>{Math.abs(change)}% {change > 0 ? '상승' : '하락'}</span>
          </div>
        )}
      </div>
    </Card>
  );
}

function UsageAmount() {
  const { value, change } = BOARD_EMPTY.usageAmount;
  return (
    <Card className={UsageAmountStyles.card}>
      <div className={UsageAmountStyles.header}>
        <div className={UsageAmountStyles.titleSection}>
          <img src="/assets/box_black.svg" alt="사용" width={20} height={20} />
          <span className={UsageAmountStyles.title}>이번 달 사용액</span>
          <Tooltip text="이번달 사용 제품의 원가 총액">
            <button className={UsageAmountStyles.helpButton} aria-label="도움말">
              <img src="/assets/help.svg" alt="도움말" width={16} height={16} />
            </button>
          </Tooltip>
        </div>
        <button className={UsageAmountStyles.moreButton}>더보기</button>
      </div>
      <div className={UsageAmountStyles.content}>
        <div className={UsageAmountStyles.amount}>
          <span className={UsageAmountStyles.value}>{value !== null ? value.toLocaleString() : '-'}</span>
          <span className={UsageAmountStyles.unit}>만원</span>
        </div>
        {change && (
          <div className={UsageAmountStyles.change}>
            <span className={UsageAmountStyles.changeLabel}>지난달 대비</span>
            <span className={UsageAmountStyles.changeValue}>{Math.abs(change)}% {change > 0 ? '상승' : '하락'}</span>
          </div>
        )}
      </div>
    </Card>
  );
}

function ExpiringInventory() {
  const { value } = BOARD_EMPTY.expiringInventory;
  return (
    <Card className={ExpiringInventoryStyles.card}>
      <div className={ExpiringInventoryStyles.header}>
        <div className={ExpiringInventoryStyles.titleSection}>
          <img src="/assets/box_black.svg" alt="재고" width={20} height={20} />
          <span className={ExpiringInventoryStyles.title}>유통기한 임박재고</span>
        </div>
        <button className={ExpiringInventoryStyles.moreButton}>더보기</button>
      </div>
      <div className={ExpiringInventoryStyles.content}>
        <div className={ExpiringInventoryStyles.amount}>
          <span className={ExpiringInventoryStyles.value}>{value !== null ? value.toLocaleString() : '-'}</span>
          <span className={ExpiringInventoryStyles.unit}>개</span>
        </div>
      </div>
    </Card>
  );
}

function NeedsOrder() {
  const { value } = BOARD_EMPTY.needsOrder;
  return (
    <Card className={NeedsOrderStyles.card}>
      <div className={NeedsOrderStyles.header}>
        <div className={NeedsOrderStyles.titleSection}>
          <img src="/assets/box_black.svg" alt="재고" width={20} height={20} />
          <span className={NeedsOrderStyles.title}>주문 필요 재고</span>
        </div>
      </div>
      <div className={NeedsOrderStyles.content}>
        <div className={NeedsOrderStyles.amount}>
          <span className={NeedsOrderStyles.value}>{value !== null ? value.toLocaleString() : '-'}</span>
          <span className={NeedsOrderStyles.unit}>개</span>
        </div>
      </div>
    </Card>
  );
}

function NotificationList() {
  const notificationCount = BOARD_EMPTY.notifications.length;
  const { listRef, showOverlay } = useScrollOverlay();
  return (
    <Card className={NotificationListStyles.card}>
      <h3 className={NotificationListStyles.title}>
        알림 <span className={NotificationListStyles.count}>{notificationCount}</span>
      </h3>
      <div className={NotificationListStyles.tableContainer}>
        <div ref={listRef} className={NotificationListStyles.listWrapper}>
          <table className={NotificationListStyles.table}>
            <thead className={NotificationListStyles.header}>
              <tr>
                <th className={NotificationListStyles.headerLabel}>일자</th>
                <th className={NotificationListStyles.headerLabel}>내용</th>
              </tr>
            </thead>
            <tbody className={NotificationListStyles.list}>
              {notificationCount === 0 ? (
                <tr>
                  <td colSpan={2}>
                    <div className={NotificationListStyles.emptyState}>
                      <p className={NotificationListStyles.emptyMessage}>알림이 없습니다.</p>
                    </div>
                  </td>
                </tr>
              ) : (
                BOARD_EMPTY.notifications.map((notification) => (
                  <tr key={notification.id} className={NotificationListStyles.item}>
                    <td className={NotificationListStyles.date}>{notification.date}</td>
                    <td className={NotificationListStyles.content}>{notification.content}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
        {showOverlay && <div className={NotificationListStyles.fadeOverlay} />}
      </div>
    </Card>
  );
}

function InboundWaitingList() {
  const inboundWaitingCount = BOARD_EMPTY.inboundWaiting.length;
  const { listRef, showOverlay } = useScrollOverlay();
  const { handleRegister } = useInboundWaiting();
  return (
    <Card className={InboundWaitingListStyles.card}>
      <h3 className={InboundWaitingListStyles.title}>
        입고대기 <span className={InboundWaitingListStyles.count}>{inboundWaitingCount}</span>
      </h3>
      <div className={InboundWaitingListStyles.tableContainer}>
        <div ref={listRef} className={InboundWaitingListStyles.listWrapper}>
          <table className={InboundWaitingListStyles.table}>
            <thead className={InboundWaitingListStyles.header}>
              <tr>
                <th className={InboundWaitingListStyles.headerLabel}>일자</th>
                <th className={InboundWaitingListStyles.headerLabel}>구매처</th>
                <th className={InboundWaitingListStyles.headerLabel}>제품명</th>
                <th className={InboundWaitingListStyles.headerLabel}>등록</th>
              </tr>
            </thead>
            <tbody className={InboundWaitingListStyles.list}>
              {inboundWaitingCount === 0 ? (
                <tr>
                  <td colSpan={4}>
                    <div className={InboundWaitingListStyles.emptyState}>
                      <p className={InboundWaitingListStyles.emptyMessage}>입고 대기 목록이 없습니다.</p>
                    </div>
                  </td>
                </tr>
              ) : (
                BOARD_EMPTY.inboundWaiting.map((item) => (
                  <tr key={item.id} className={InboundWaitingListStyles.item}>
                    <td className={InboundWaitingListStyles.date}>{item.date}</td>
                    <td className={InboundWaitingListStyles.purchaser}>{item.purchaser}</td>
                    <td className={InboundWaitingListStyles.productName}>{item.productName}</td>
                    <td className={InboundWaitingListStyles.registerCell}>
                      <button className={InboundWaitingListStyles.registerButton} onClick={() => handleRegister(item.id)}>
                        등록
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
        {showOverlay && <div className={InboundWaitingListStyles.fadeOverlay} />}
      </div>
    </Card>
  );
}

function ProductCategories() {
  const categoryCards = useMemo(() => BOARD_EMPTY.categories, []);
  const mockSets = BOARD_EMPTY.sets;
  const { handleToggleFavorite } = useToggleFavorite();
  const { handleAddToCart } = useAddToCart();
  const { handleUse } = useProductUse();
  const { categoryOrder, handleDragStart, handleDragOver, handleDrop } = useCategoryOrder(categoryCards);
  return (
    <div className={ProductCategoriesStyles.container}>
      {categoryOrder.map((category, index) => (
        <div
          key={category.id}
          draggable={true}
          onDragStart={handleDragStart(index)}
          onDragOver={handleDragOver}
          onDrop={handleDrop(index)}
        >
          <ProductCategorySet
            title={category.title}
            products={category.products}
            onToggleFavorite={handleToggleFavorite}
            onAddToCart={handleAddToCart}
            onUse={handleUse}
          />
        </div>
      ))}
      <ProductCategorySet
        isSet={true}
        title="세트"
        products={mockSets}
        onToggleFavorite={handleToggleFavorite}
        onUse={handleUse}
      />
    </div>
  );
}

function InventoryMapWidget() {
  const { selectedTab, displayedLocations, hasLocations, handleTabChange, handleLocationDrop } = useInventoryMap();
  const { handleDragStart, handleDragOver, handleDrop } = useDragSwap({
    type: 'inventory-location',
    onSwap: handleLocationDrop,
  });
  return (
    <div style={componentStyles.inventoryMapWidgetContainer}>
      <Card className={InventoryMapStyles.card}>
        <div className={InventoryMapStyles.header}>
          <h3 className={InventoryMapStyles.title}>재고지도</h3>
          {hasLocations && (
            <div className={InventoryMapStyles.tabs}>
              {TABS.map((tab) => (
                <button
                  key={tab.id}
                  className={clsx(InventoryMapStyles.tab, selectedTab === tab.id && InventoryMapStyles.active)}
                  onClick={() => handleTabChange(tab.id)}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          )}
          <button className={InventoryMapStyles.settingsButton} aria-label="설정">
            설정
            <img src="/assets/right-arrow.svg" alt="" width={12} height={12} />
          </button>
        </div>
        {hasLocations ? (
          <div className={InventoryMapStyles.content}>
            <div className={InventoryMapStyles.grid}>
              {displayedLocations.map((location, index) => (
                <div
                  key={location?.id || `empty-${index}`}
                  className={clsx(InventoryMapStyles.locationCard, !location && InventoryMapStyles.empty)}
                  draggable={Boolean(location)}
                  onDragStart={location ? handleDragStart(index) : undefined}
                  onDragOver={handleDragOver}
                  onDrop={handleDrop(index)}
                >
                  {location && (
                    <>
                      <div className={InventoryMapStyles.team}>{location.team}</div>
                      <div className={InventoryMapStyles.name}>{location.name}</div>
                    </>
                  )}
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className={InventoryMapStyles.emptyState}>
            <p className={InventoryMapStyles.emptyDescription}>
              재고지도가 없습니다.<br/>재고지도를 만들어 재고를 한 눈에 관리하세요!
            </p>
            <button className={InventoryMapStyles.createButton}>재고지도 만들기</button>
          </div>
        )}
      </Card>
      <DetailedMapWrapper />
    </div>
  );
}

function DetailedMapWrapper() {
  const locationDetail = useDetailedMap();
  return (
    <Card className={DetailedMapStyles.card}>
      <div className={DetailedMapStyles.header}>
        <h3 className={DetailedMapStyles.title}>상세지도</h3>
      </div>
      <div className={DetailedMapStyles.content}>
        {locationDetail ? (
          <div className={DetailedMapStyles.itemList}>
            {locationDetail.items.map((item) => (
              <div key={item.id} className={DetailedMapStyles.itemCard}>
                <span className={DetailedMapStyles.itemName}>{item.name}</span>
                <span className={DetailedMapStyles.itemQuantity}>{item.quantity}개</span>
              </div>
            ))}
          </div>
        ) : (
          <div className={DetailedMapStyles.emptyState}>
            재고지도에서 위치 박스를 눌러<br/> 상세 위치를 확인해 보세요.
          </div>
        )}
      </div>
    </Card>
  );
}

export default function Board() {
  const { handleSearch, handleSettingsClick } = useSearch();
  const {
    isOpen,
    openFilter,
    closeFilter,
    appliedFilters,
    tempFilters,
    activeFilters,
    toggleFilter,
    clearAllFilters,
    clearAppliedFilters,
    confirmFilter,
    toggleActiveFilter,
  } = useFilter();

  return (
    <div style={pageStyles.container}>
      <div style={pageStyles.grid}>
        <div style={pageStyles.summaryRow}>
          <SummaryStats />
        </div>

        <main style={pageStyles.main}>
          <SearchBar onSearch={handleSearch} onSettingsClick={handleSettingsClick} />

          <SelectedFilters
            selectedFilters={appliedFilters}
            activeFilters={activeFilters}
            onToggleFilter={toggleActiveFilter}
            onClearAll={clearAppliedFilters}
            onOpenFilter={openFilter}
          />

          <InventoryMapWidget />
        </main>

        <aside style={pageStyles.aside}>
          <NotificationList />
          <InboundWaitingList />
        </aside>

        <div style={pageStyles.categoriesRow}>
          <ProductCategories />
        </div>
      </div>

      <FilterDialog
        isOpen={isOpen}
        selectedFilters={tempFilters}
        onToggleFilter={toggleFilter}
        onClearAll={clearAllFilters}
        onCancel={closeFilter}
        onConfirm={confirmFilter}
      />
    </div>
  );
}
