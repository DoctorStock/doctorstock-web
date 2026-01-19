export interface Product {
  id: string;
  name: string;
  quantity?: number;
  tags?: string[];
  description?: string;
  isFavorite?: boolean;
}

