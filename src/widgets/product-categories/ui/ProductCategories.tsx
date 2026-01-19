import { ProductCategorySet, useToggleFavorite, useAddToCart, useProductUse } from '@/features/product-category-set';
import { MOCK_FIRST_CATEGORY, MOCK_SECOND_CATEGORY, MOCK_THIRD_CATEGORY, MOCK_SETS } from '../model/mocks';
import styles from './ProductCategories.module.css';

export function ProductCategories() {

  const { handleToggleFavorite } = useToggleFavorite();
  const { handleAddToCart } = useAddToCart();
  const { handleUse } = useProductUse();

  return (
    <div className={styles.container}>
      <ProductCategorySet
        title="주사제"
        products={MOCK_FIRST_CATEGORY}
        onToggleFavorite={handleToggleFavorite}
        onAddToCart={handleAddToCart}
        onUse={handleUse}
      />
      <ProductCategorySet
        title="소모품"
        products={MOCK_SECOND_CATEGORY}
        onToggleFavorite={handleToggleFavorite}
        onAddToCart={handleAddToCart}
        onUse={handleUse}
      />
      <ProductCategorySet
        title="필러/보톡스/실"
        products={MOCK_THIRD_CATEGORY}
        onToggleFavorite={handleToggleFavorite}
        onAddToCart={handleAddToCart}
        onUse={handleUse}
      />
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

