export function getCategoryIcon(categoryTitle: string, isSet?: boolean, hasActiveFilters?: boolean): string {
  const suffix = hasActiveFilters ? '_blue' : '_black';
  
  if (isSet) {
    return `/assets/kit${suffix}.svg`;
  }
  switch (categoryTitle) {
    case '주사제':
      return `/assets/inject${suffix}.svg`;
    case '소모품':
      return `/assets/supplies${suffix}.svg`;
    case '필러/보톡스/실':
      return `/assets/filler${suffix}.svg`;
    default:
      return `/assets/box${suffix}.svg`;
  }
}
