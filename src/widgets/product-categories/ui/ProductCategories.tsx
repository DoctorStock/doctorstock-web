import { ProductCategorySet, useToggleFavorite, useAddToCart, useProductUse } from '@/features/product-category-set';
import { CATEGORY_CARDS, MOCK_SETS } from '../model/mocks';
import { useCategoryOrder } from '../model/useCategoryOrder';
import styles from './ProductCategories.module.css';

export function ProductCategories() {

  const { handleToggleFavorite } = useToggleFavorite();
  const { handleAddToCart } = useAddToCart();
  const { handleUse } = useProductUse();
  const { categoryOrder, handleDragStart, handleDragOver, handleDrop } = useCategoryOrder(CATEGORY_CARDS);

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
            onToggleFavorite={handleToggleFavorite}
            onAddToCart={handleAddToCart}
            onUse={handleUse}
          />
        </div>
      ))}
      <ProductCategorySet
        isSet={true}
        title="세트"
        products={MOCK_SETS}
        onToggleFavorite={handleToggleFavorite}
        onUse={handleUse}
      />
    </div>
  );
}