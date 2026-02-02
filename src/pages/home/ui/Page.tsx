import { SummaryStats } from '@/widgets/summary-stats';
import { SearchBar, useSearch } from '@/features/search';
import { FilterDialog, SelectedFilters, useFilter } from '@/features/filter';
import { NotificationList } from '@/features/notification';
import { InboundWaitingList } from '@/features/inbound-waiting';
import { ProductCategories } from '@/widgets/product-categories';
import { InventoryMapWidget } from '@/widgets/inventory-map-widget';
import { useAddToCart } from '@/features/product-category-set';
import styles from './Page.module.css';

export default function Home() {
  const search = useSearch();
  const { handleAddToCart } = useAddToCart();
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
          <SearchBar
            query={search.query}
            results={search.results}
            isOpen={search.isOpen}
            onInputChange={search.handleInputChange}
            onSearch={search.handleSearch}
            onSelect={search.handleSelect}
            onClose={search.handleClose}
            onSettingsClick={search.handleSettingsClick}
            onFocus={search.handleFocus}
            onToggleFavorite={search.handleToggleFavorite}
            onAddToCart={handleAddToCart}
          />

          <SelectedFilters
            selectedFilters={appliedFilters}
            activeFilters={activeFilters}
            onToggleFilter={toggleActiveFilter}
            onClearAll={clearAppliedFilters}
            onOpenFilter={openFilter}
          />

          <InventoryMapWidget hasActiveFilters={activeFilters.size > 0} />
        </main>

        <aside className={styles.aside}>
          <NotificationList />
          <InboundWaitingList />
        </aside>

        <div className={styles.categoriesRow}>
          <ProductCategories hasActiveFilters={activeFilters.size > 0} />
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