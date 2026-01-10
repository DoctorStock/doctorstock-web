import { useState } from 'react';
import { ProductCategoryCard } from './ProductCategoryCard';
import {
  MOCK_INJECTABLES,
  MOCK_CONSUMABLES,
  MOCK_FILLER_BOTOX_THREAD,
  MOCK_SETS,
} from '../model/mocks';
import type { Product } from '../model/types';
import styles from './ProductCategories.module.css';

export function ProductCategories() {
  const [injectables, setInjectables] = useState<Product[]>(MOCK_INJECTABLES);
  const [consumables, setConsumables] = useState<Product[]>(MOCK_CONSUMABLES);
  const [fillerBotoxThread, setFillerBotoxThread] = useState<Product[]>(MOCK_FILLER_BOTOX_THREAD);
  const [sets, setSets] = useState<Product[]>(MOCK_SETS);

  const handleToggleFavorite = (category: string) => (id: string) => {
    const setters = {
      injectables: setInjectables,
      consumables: setConsumables,
      fillerBotoxThread: setFillerBotoxThread,
      sets: setSets,
    };

    setters[category as keyof typeof setters]?.((prev) =>
      prev.map((product) =>
        product.id === id ? { ...product, isFavorite: !product.isFavorite } : product
      )
    );
  };

  return (
    <div className={styles.container}>
      <ProductCategoryCard
        title="주사제"
        products={injectables}
        onToggleFavorite={handleToggleFavorite('injectables')}
      />
      <ProductCategoryCard
        title="소모품"
        products={consumables}
        onToggleFavorite={handleToggleFavorite('consumables')}
      />
      <ProductCategoryCard
        title="필러/보톡스/실"
        products={fillerBotoxThread}
        onToggleFavorite={handleToggleFavorite('fillerBotoxThread')}
      />
      <ProductCategoryCard
        title="세트"
        products={sets}
        isSet={true}
        onToggleFavorite={handleToggleFavorite('sets')}
      />
    </div>
  );
}

