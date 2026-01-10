import { useState } from 'react';

export function useSearch() {
  const [query, setQuery] = useState('');

  const handleSearch = (searchQuery: string) => {
    setQuery(searchQuery);
    // TODO: 검색 로직 구현
  };

  const handleSettingsClick = () => {
    // TODO: 설정 다이얼로그 열기
  };

  return {
    query,
    handleSearch,
    handleSettingsClick,
  };
}