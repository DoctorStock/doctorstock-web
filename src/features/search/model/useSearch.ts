import { useState, useMemo } from 'react';
import { getSearchResults } from './lib/searchUtils';
import type { SearchResultItem } from './types';

export function useSearch() {
  const [query, setQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [favoriteIds, setFavoriteIds] = useState<Set<string>>(new Set());

  const results = useMemo(() => {
    if (!query.trim()) {
      return [];
    }
    const searchResults = getSearchResults(query);
    // 즐겨찾기 상태 반영 (토글된 아이템은 원래 상태를 반전)
    return searchResults.map((item) => ({
      ...item,
      isFavorite: favoriteIds.has(item.id) ? !item.isFavorite : item.isFavorite,
    }));
  }, [query, favoriteIds]);

  // 즐겨찾기 토글
  const handleToggleFavorite = (itemId: string) => {
    setFavoriteIds((prev) => {
      const next = new Set(prev);
      if (next.has(itemId)) {
        next.delete(itemId);
      } else {
        next.add(itemId);
      }
      return next;
    });
  };

  // 검색 타이핑 시
  const handleInputChange = (value: string) => {
    setQuery(value);
    setIsOpen(value.trim().length > 0);
  };

  // 검색 enter 및 검색 아이콘 클릭
  const handleSearch = (searchQuery: string) => {
    setQuery(searchQuery);
    // 검색어가 있으면 드롭다운 열기 (결과가 없어도 빈 상태 표시)
    setIsOpen(searchQuery.trim().length > 0);
  };

  // 검색 결과 선택 시
  const handleSelect = (item: SearchResultItem) => {
    setQuery(item.name);
    setIsOpen(false);
  };

  // 검색창 포커스 시 검색 결과가 있으면 드롭다운 열기
  const handleFocus = () => {
    if (query.trim() && results.length > 0) {
      setIsOpen(true);
    }
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  const handleSettingsClick = () => {
    // TODO: 설정 다이얼로그 열기
  };

  return {
    query,
    results,
    isOpen,
    handleInputChange,
    handleSearch,
    handleSelect,
    handleClose,
    handleSettingsClick,
    handleFocus,
    handleToggleFavorite,
  };
}