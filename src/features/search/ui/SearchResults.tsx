import clsx from 'clsx';
import styles from './SearchResults.module.css';
import type { SearchResultItem } from '../model/types';

interface SearchResults {
  results: SearchResultItem[];
  onSelect?: (item: SearchResultItem) => void;
  onToggleFavorite?: (itemId: string) => void;
  onAddToCart?: (itemId: string) => void;
}

export function SearchResults({ results, onSelect, onToggleFavorite, onAddToCart }: SearchResults) {
  return (
    <div className={styles.container}>
      <table className={styles.table}>
        <thead className={styles.header}>
          <tr>
            <th className={styles.headerLabel}>제품명</th>
            <th className={styles.headerLabel}>수량</th>
            <th className={styles.headerLabel}>카테고리</th>
            <th className={styles.headerLabel}>최근 입고일</th>
            <th className={styles.headerLabel}>유통기한</th>
            <th className={styles.headerLabel}>담기</th>
          </tr>
        </thead>

        <tbody className={styles.list}>
          {results.length === 0 ? (
            <tr>
              <td colSpan={6} className={styles.emptyState}>
                검색 결과가 없습니다.
              </td>
            </tr>
          ) : (
            results.map((item) => (
            <tr
              key={item.id}
              className={styles.item}
              onClick={() => onSelect?.(item)}
            >
              <td className={styles.productNameCell}>
                <div className={styles.productInfo}>
                  <button
                    className={styles.starIcon}
                    onClick={(e) => {
                      e.stopPropagation();
                      onToggleFavorite?.(item.id);
                    }}
                    aria-label={item.isFavorite ? '즐겨찾기 해제' : '즐겨찾기 추가'}
                  >
                    <img
                      src={item.isFavorite ? '/assets/star_on.svg' : '/assets/star_off.svg'}
                      alt=""
                      width={24}
                      height={24}
                    />
                  </button>
                  <span className={styles.productName}>{item.name}</span>
                </div>
              </td>

              <td className={styles.quantityCell}>
                {item.quantity.toLocaleString()}
              </td>

              <td className={styles.categoryCell}>
                <span
                  className={clsx(
                    styles.categoryBadge,
                    item.category === '필러/보톡스/실' && styles.categoryFiller,
                    item.category === '소모품' && styles.categorySupplies,
                    item.category === '화장품' && styles.categoryCosmetics,
                    item.category === '주사제' && styles.categoryInject
                  )}
                >
                  {item.category}
                </span>
              </td>

              <td className={styles.dateCell}>{item.recentInboundDate}</td>
              <td className={styles.dateCell}>{item.expirationDate}</td>

              <td className={styles.actionCell}>
                <button
                  className={styles.addToCartButton}
                  onClick={(e) => {
                    e.stopPropagation();
                    onAddToCart?.(item.id);
                  }}
                  aria-label="담기"
                >
                  <img src="/assets/basket.svg" alt="담기" width={20} height={20} />
                </button>
              </td>
            </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}