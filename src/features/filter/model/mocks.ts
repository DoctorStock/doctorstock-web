export const BASIC_FILTERS = [
  { id: 'favorites', label: '즐겨찾기', icon: 'star' },
  { id: 'expiring', label: '재고임박', icon: null },
  { id: 'expiration', label: '유통기한 임박', icon: null },
] as const;

export const HASHTAG_FILTERS = [
  { id: 'acne', label: '#여드름' },
  { id: 'sensitive', label: '#민감성' },
  { id: 'moisturizing', label: '#보습' },
] as const;

