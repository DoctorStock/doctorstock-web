import type { Product } from '@/entities/product';
import type { CategoryCard } from './types';

export const MOCK_FIRST_CATEGORY: Product[] = [
  {
    id: '1',
    name: '일이삼사오육칠팔구십십일',
    quantity: 1324,
    tags: ['#재고임박', '#D-2'],
    isFavorite: false,
  },
  {
    id: '2',
    name: '일이삼사오육칠팔구십십일',
    quantity: 1324,
    tags: ['#재고임박', '#D-2'],
    isFavorite: false,
  },
  {
    id: '3',
    name: '일이삼사오육칠팔구십십일',
    quantity: 1324,
    tags: ['#재고임박', '#D-2'],
    isFavorite: false,
  },
  {
    id: '4',
    name: '일이삼사오육칠팔구십십일',
    quantity: 1324,
    tags: ['#재고임박', '#D-2'],
    isFavorite: false,
  },
  {
    id: '5',
    name: '일이삼사오육칠팔구십십일',
    quantity: 1324,
    tags: ['#재고임박', '#D-2'],
    isFavorite: false,
  },
  {
    id: '6',
    name: '일이삼사오육칠팔구십십일',
    quantity: 1324,
    tags: ['#재고임박', '#D-2'],
    isFavorite: false,
  },
  {
    id: '7',
    name: '일이삼사오육칠팔구십십일',
    quantity: 1324,
    tags: ['#재고임박', '#D-2'],
    isFavorite: false,
  },
  {
    id: '8',
    name: '일이삼사오육칠팔구십십일',
    quantity: 1324,
    tags: ['#재고임박', '#D-2'],
    isFavorite: false,
  },
  {
    id: '9',
    name: '일이삼사오육칠팔구십십일',
    quantity: 1324,
    tags: ['#재고임박', '#D-2'],
    isFavorite: false,
  },
  {
    id: '10',
    name: '일이삼사오육칠팔구십십일',
    quantity: 1324,
    tags: ['#재고임박', '#D-2'],
    isFavorite: false,
  },
];

export const MOCK_SECOND_CATEGORY: Product[] = [
  {
    id: 'c1',
    name: '벨로테로 볼륨 (본사로 주문)',
    quantity: 543,
    isFavorite: false,
  },
  {
    id: 'c2',
    name: '벨로테로 볼륨 (본사로 주문)',
    quantity: 543,
    isFavorite: false,
  },
];

export const MOCK_THIRD_CATEGORY: Product[] = [];

export const MOCK_SETS: Product[] = [
  {
    id: 's1',
    name: '매출 1위 세트',
    description: '쥬베룩 볼륨(1), 락시린지(1)',
    isFavorite: false,
  },
  {
    id: 's2',
    name: '매출 1위 세트',
    description: '쥬베룩 볼륨(1), 락시린지(1)',
    isFavorite: false,
  },
  {
    id: 's3',
    name: '매출 1위 세트',
    description: '쥬베룩 볼륨(1), 락시린지(1)',
    isFavorite: false,
  },
  {
    id: 's4',
    name: '매출 1위 세트',
    description: '쥬베룩 볼륨(1), 락시린지(1)',
    isFavorite: false,
  },
  {
    id: 's5',
    name: '매출 1위 세트',
    description: '쥬베룩 볼륨(1), 락시린지(1)',
    isFavorite: false,
  },
  {
    id: 's6',
    name: '매출 1위 세트',
    description: '쥬베룩 볼륨(1), 락시린지(1)',
    isFavorite: false,
  },
  {
    id: 's7',
    name: '매출 1위 세트',
    description: '쥬베룩 볼륨(1), 락시린지(1)',
    isFavorite: false,
  },
  {
    id: 's8',
    name: '매출 1위 세트',
    description: '쥬베룩 볼륨(1), 락시린지(1)',
    isFavorite: false,
  },
];

export const CATEGORY_CARDS: CategoryCard[] = [
  { id: 'category-1', title: '주사제', products: MOCK_FIRST_CATEGORY },
  { id: 'category-2', title: '소모품', products: MOCK_SECOND_CATEGORY },
  { id: 'category-3', title: '필러/보톡스/실', products: MOCK_THIRD_CATEGORY },
];