import { Dialog } from '@/shared/ui/dialog';
import { BASIC_FILTERS, HASHTAG_FILTERS } from '../model/mocks';
import type { FilterId } from '../model/types';
import styles from './FilterDialog.module.css';

interface FilterDialogProps {
  isOpen: boolean;
  selectedFilters: Set<FilterId>;
  onToggleFilter: (filterId: FilterId) => void;
  onClearAll: () => void;
  onCancel: () => void;
  onConfirm: () => void;
}

// TODO: 반복되는 필터칩 버튼 코드 리펙토링
export function FilterDialog({
  isOpen,
  selectedFilters,
  onToggleFilter,
  onClearAll,
  onCancel,
  onConfirm,
}: FilterDialogProps) {
  if (!isOpen) return null;

  const hasSelectedFilters = selectedFilters.size > 0;

  return (
    <Dialog
      title="필터"
      footerLeft={
        <div className={styles.clearAllWrapper} data-visible={hasSelectedFilters}>
          <button className={styles.clearAllButton} onClick={onClearAll}>
            <img src="/assets/cancel.svg" alt="" width={18} height={18} />
            <span>전체제거</span>
          </button>
        </div>
      }
      onCancel={onCancel}
      onConfirm={onConfirm}
    >
      <div className={styles.content}>
        <div className={styles.basicFilters}>
          {BASIC_FILTERS.map((filter) => {
            const isSelected = selectedFilters.has(filter.id);
            return (
              <button
                key={filter.id}
                className={`${styles.filterButton} ${styles.basicButton} ${isSelected ? styles.selected : ''}`}
                onClick={() => {
                  if (!isSelected) {
                    onToggleFilter(filter.id);
                  }
                }}
              >
                {filter.icon && (
                  <img
                    src={`/assets/${filter.icon}${isSelected ? '_on' : '_off'}.svg`}
                    alt=""
                    width={20}
                    height={20}
                  />
                )}
                <span>{filter.label}</span>
                {isSelected && (
                  <button
                    className={styles.closeButton}
                    onClick={(e) => {
                      e.stopPropagation();
                      onToggleFilter(filter.id);
                    }}
                  >
                    <img src="/assets/cancel.svg" alt="취소" width={18} height={18} />
                  </button>
                )}
              </button>
            );
          })}
        </div>

        <div className={styles.hashtagFilters}>
          {HASHTAG_FILTERS.map((filter) => {
            const isSelected = selectedFilters.has(filter.id);
            return (
              <button
                key={filter.id}
                className={`${styles.filterButton} ${styles.hashtagButton} ${isSelected ? styles.selected : ''}`}
                onClick={() => {
                  if (!isSelected) {
                    onToggleFilter(filter.id);
                  }
                }}
              >
                <span>{filter.label}</span>
                {isSelected && (
                  <button
                    className={styles.closeButton}
                    onClick={(e) => {
                      e.stopPropagation();
                      onToggleFilter(filter.id);
                    }}
                  >
                    <img src="/assets/cancel.svg" alt="취소" width={18} height={18} />
                  </button>
                )}
              </button>
            );
          })}
        </div>
      </div>
    </Dialog>
  );
}

