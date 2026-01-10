import { useState } from 'react';
import styles from './SearchBar.module.css';

interface SearchBarProps {
  onSearch?: (query: string) => void;
  onSettingsClick?: () => void;
  placeholder?: string;
}

export function SearchBar({
  onSearch,
  onSettingsClick,
  placeholder = '물품 이름을 입력해 주세요(소모품, 주사제, 필러 등...)',
}: SearchBarProps) {
  const [query, setQuery] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch?.(query);
  };

  return (
    <form className={styles.container} onSubmit={handleSubmit}>
      <div className={styles.searchGroup}>
        <div className={styles.searchWrapper}>
          <input
            type="text"
            className={styles.input}
            placeholder={placeholder}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <button type="submit" className={styles.searchIconButton}>
            <img
              src="/assets/search.svg"
              alt="검색"
              width={23}
              height={23}
            />
          </button>
        </div>
      </div>

      <div className={styles.actionArea}>
      {onSettingsClick && (
          <button
            type="button"
            className={styles.settingsButton}
            onClick={onSettingsClick}
          >
            <img src="/assets/setting.svg" alt="설정" width={36} height={36} />
          </button>
        )}
      </div>
    </form>
  );
}
