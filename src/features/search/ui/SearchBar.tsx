import { useRef } from 'react';
import styles from './SearchBar.module.css';
import { SearchResults } from './SearchResults';
import { useClickOutside } from '@/shared/hooks/useClickOutside';
import type { SearchResultItem } from '../model/types';

interface SearchBar {
  onSearch?: (query: string) => void;
  onSettingsClick?: () => void;
  placeholder?: string;
  query?: string;
  results?: SearchResultItem[];
  isOpen?: boolean;
  onInputChange?: (value: string) => void;
  onSelect?: (item: SearchResultItem) => void;
  onClose?: () => void;
  onFocus?: () => void;
  onToggleFavorite?: (itemId: string) => void;
  onAddToCart?: (itemId: string) => void;
}

export function SearchBar({
  onSearch,
  onSettingsClick,
  placeholder = '물품 이름을 입력해 주세요(소모품, 주사제, 필러 등...)',
  query = '',
  results = [],
  isOpen = false,
  onInputChange,
  onSelect,
  onClose,
  onFocus,
  onToggleFavorite,
  onAddToCart,
}: SearchBar) {
  const searchRef = useRef<HTMLDivElement>(null);

  useClickOutside(searchRef, () => {
    if (isOpen) {
      onClose?.();
    }
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch?.(query);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    onInputChange?.(value);
  };

  return (
    <div ref={searchRef} className={styles.wrapper}>
      <form className={styles.container} onSubmit={handleSubmit}>
        <div className={styles.searchGroup}>
          <div className={styles.searchWrapper}>
            <input
              type="text"
              className={styles.input}
              placeholder={placeholder}
              value={query}
              onChange={handleInputChange}
              onFocus={onFocus}
            />
            <button type="submit" className={styles.searchIconButton}>
              <img
                src="/assets/search.svg"
                alt="검색"
                width={23}
                height={23}
              />
            </button>
            {isOpen && (
              <SearchResults
                results={results}
                onSelect={onSelect}
                onToggleFavorite={onToggleFavorite}
                onAddToCart={onAddToCart}
              />
            )}
          </div>
        </div>

        <div className={styles.actionArea}>
          {onSettingsClick && (
            <button
              type="button"
              className={styles.settingsButton}
              onClick={onSettingsClick}
            >
              <img src="/assets/setting_black.svg" alt="설정" width={36} height={36} />
            </button>
          )}
        </div>
      </form>
    </div>
  );
}
