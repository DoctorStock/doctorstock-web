import { useState } from 'react';
import { useDragSwap } from '@/shared/hooks/useDragSwap';
import type { CategoryCard } from './types';

export function useCategoryOrder(initial: CategoryCard[]) {
  const [categoryOrder, setCategoryOrder] = useState<CategoryCard[]>(initial);
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

  return { categoryOrder, handleDragStart, handleDragOver, handleDrop };
}