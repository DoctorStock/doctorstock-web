import { BASIC_FILTERS, HASHTAG_FILTERS } from '../model/mocks';
import type { FilterId } from '../model/types';
import styles from './SelectedFilters.module.css';

interface SelectedFiltersProps {
  selectedFilters: Set<FilterId>;
  activeFilters: Set<FilterId>;
  onToggleFilter: (filterId: FilterId) => void;
  onClearAll: () => void;
  onOpenFilter: () => void;
}

export function SelectedFilters({
  selectedFilters,
  activeFilters,
  onToggleFilter,
  onClearAll,
  onOpenFilter,
}: SelectedFiltersProps) {
  const allFilters = [...BASIC_FILTERS, ...HASHTAG_FILTERS];
  const selectedFilterList = allFilters.filter((filter) =>
    selectedFilters.has(filter.id)
  );
  const hasActiveFilters = activeFilters.size > 0;

  return (
    <div className={styles.container}>
      <button
        className={`${styles.filterIconButton} ${hasActiveFilters ? styles.active : ''}`}
        onClick={onOpenFilter}
      >
        <img src={`/assets/filter${hasActiveFilters ? '_blue' : '_black'}.svg`} alt="필터"/>
        {hasActiveFilters && (
          <img src="/assets/blue_on.svg" alt="" className={styles.onIcon} />
        )}
      </button>
      {selectedFilterList.map((filter) => {
        const isActive = activeFilters.has(filter.id);
        return (
          <button
            key={filter.id}
            className={`${styles.filterChip} ${isActive ? styles.active : ''}`}
            onClick={() => onToggleFilter(filter.id)}
          >
            {'icon' in filter && filter.icon && (
              <img
                src={`/assets/${filter.icon}${isActive ? '_on' : '_off'}.svg`}
                alt=""
                width={20}
                height={20}
              />
            )}
            {filter.label}
          </button>
        );
      })}
      {selectedFilterList.length > 0 && (
        <button className={styles.clearAllButton} onClick={onClearAll}>
          <img src="/assets/cancel.svg" alt="" width={18} height={18} />
          전체제거
        </button>
      )}
    </div>
  );
}

