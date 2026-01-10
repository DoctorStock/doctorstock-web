import { Card } from '@/shared/ui/card';
import type { Product } from '../model/types';
import styles from './ProductCategoryCard.module.css';

interface ProductCategoryCardProps {
  title: string;
  products: Product[];
  isSet?: boolean;
  onToggleFavorite?: (id: string) => void;
  onAddToCart?: (id: string) => void;
  onUse?: (id: string) => void;
}

export function ProductCategoryCard({
  title,
  products,
  isSet = false,
  onToggleFavorite,
  onAddToCart,
  onUse,
}: ProductCategoryCardProps) {
  return (
    <Card className={styles.card}>
      <div className={styles.header}>
        <img src="/assets/box-check.svg" alt="" width={20} height={20} />
        <h3 className={styles.title}>{title}</h3>
      </div>
      <div className={styles.tableContainer}>
        <table className={styles.table}>
          <thead className={styles.tableHeader}>
            <tr>
              <th className={styles.headerLabel}>제품명</th>
              {!isSet && (
                <>
                  <th className={styles.headerLabel}>수량</th>
                  <th className={styles.headerLabel}>담기</th>
                </>
              )}
              <th className={styles.headerLabel}>사용</th>
            </tr>
          </thead>
          <tbody className={styles.tableBody}>
            {products.map((product) => (
              <tr key={product.id} className={styles.row}>
                <td className={styles.productNameCell}>
                  <div className={styles.productInfo}>
                    <button
                      className={styles.starButton}
                      onClick={() => onToggleFavorite?.(product.id)}
                      aria-label={product.isFavorite ? '즐겨찾기 해제' : '즐겨찾기 추가'}
                    >
                      <img
                        src={product.isFavorite ? '/assets/star_on.svg' : '/assets/star_off.svg'}
                        alt=""
                        width={24}
                        height={24}
                      />
                    </button>
                    <div className={styles.productDetails}>
                      <span className={styles.productName}>{product.name}</span>
                      {product.description && (
                        <span className={styles.description}>{product.description}</span>
                      )}
                      {product.tags && product.tags.length > 0 && (
                        <div className={styles.tags}>
                          {product.tags.map((tag, index) => (
                            <span key={index} className={styles.tag}>
                              {tag}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </td>
                {!isSet && (
                  <>
                    <td className={styles.quantityCell}>
                      {product.quantity?.toLocaleString()}
                    </td>
                    <td className={styles.addToCartCell}>
                      <button
                        className={styles.addToCartButton}
                        onClick={() => onAddToCart?.(product.id)}
                        aria-label="담기"
                      >
                        <img src="/assets/basket.svg" alt="담기" width={20} height={20} />
                      </button>
                    </td>
                  </>
                )}
                <td className={styles.useCell}>
                  <button className={styles.useButton} onClick={() => onUse?.(product.id)}>
                    사용
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  );
}

