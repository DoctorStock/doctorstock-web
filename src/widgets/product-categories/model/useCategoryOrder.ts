import { useState, useEffect } from 'react';
import { useDragSwap } from '@/shared/hooks/useDragSwap';
import type { CategoryCard } from './types';
import type { Product } from '@/entities/product';

export function useCategoryOrder(initial: CategoryCard[], initialSets: Product[] = []) {
  const [categoryOrder, setCategoryOrder] = useState<CategoryCard[]>(initial);
  const [sets, setSets] = useState<Product[]>(initialSets);
  
  useEffect(() => {
    setCategoryOrder(initial);
  }, [initial]);

  const { handleDragStart, handleDragOver, handleDrop } = useDragSwap({
    type: 'category-card',
    onSwap: (fromIndex, toIndex) => {
      // 인덱스 기준으로 swap
      setCategoryOrder((prev) => {
        const next = [...prev];
        [next[fromIndex], next[toIndex]] = [next[toIndex], next[fromIndex]];
        return next;
      });
    },
  });

  // 상품 즐겨찾기 토글 함수
  const toggleProductFavorite = (products: Product[], productId: string): Product[] => {
    return products.map((product) =>
      product.id === productId
        ? { ...product, isFavorite: !product.isFavorite }
        : product
    );
  };

  const handleToggleFavorite = (productId: string) => {
    setCategoryOrder((prev) =>
      prev.map((category) => ({
        ...category,
        products: toggleProductFavorite(category.products, productId),
      }))
    );
    setSets((prev) => toggleProductFavorite(prev, productId));
  };

  return { categoryOrder, sets, handleDragStart, handleDragOver, handleDrop, handleToggleFavorite };
}