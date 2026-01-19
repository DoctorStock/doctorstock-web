import type { Product } from '@/entities/product';

export type CategoryCard = {
  id: string;
  title: string;
  products: Product[];
};