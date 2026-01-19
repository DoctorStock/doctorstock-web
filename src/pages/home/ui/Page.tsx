import { SummaryStats } from '@/widgets/summary-stats';
import { SearchBar, useSearch } from '@/features/search';
import { FilterDialog, SelectedFilters, useFilter } from '@/features/filter';
import { NotificationList } from '@/features/notification';
import { InboundWaitingList } from '@/features/inbound-waiting';
import { ProductCategories } from '@/widgets/product-categories';
import { InventoryMapWidget } from '@/widgets/inventory-map-widget';
import styles from './Page.module.css';

export default function Home() {
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
    <div className={styles.container}>
      <div className={styles.grid}>
        <div className={styles.summaryRow}>
          <SummaryStats />
        </div>

        <main className={styles.main}>
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

        <aside className={styles.aside}>
          <NotificationList />
          <InboundWaitingList />
        </aside>

        <div className={styles.categoriesRow}>
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
