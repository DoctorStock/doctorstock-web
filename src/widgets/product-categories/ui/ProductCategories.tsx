import { ProductCategorySet, useAddToCart, useProductUse } from '@/features/product-category-set';
import { CATEGORY_CARDS, MOCK_SETS } from '../model/mocks';
import { useCategoryOrder } from '../model/useCategoryOrder';
import styles from './ProductCategories.module.css';

interface ProductCategories {
  hasActiveFilters?: boolean;
}

export function ProductCategories({ hasActiveFilters = false }: ProductCategories) {
  const { handleAddToCart } = useAddToCart();
  const { handleUse } = useProductUse();
  const { categoryOrder, sets, handleDragStart, handleDragOver, handleDrop, handleToggleFavorite } = useCategoryOrder(CATEGORY_CARDS, MOCK_SETS);

  return (
    <div className={styles.container}>
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
            hasActiveFilters={hasActiveFilters}
            onToggleFavorite={handleToggleFavorite}
            onAddToCart={handleAddToCart}
            onUse={handleUse}
          />
        </div>
      ))}
      <ProductCategorySet
        isSet={true}
        title="세트"
        products={sets}
        onToggleFavorite={handleToggleFavorite}
        onUse={handleUse}
      />
    </div>
  );
}