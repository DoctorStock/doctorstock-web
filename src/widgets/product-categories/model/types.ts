export interface Product {
  id: string;
  name: string;
  quantity?: number;
  description?: string;
  tags?: string[];
  isFavorite?: boolean;
}

