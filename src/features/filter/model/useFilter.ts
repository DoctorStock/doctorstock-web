import { useState, useEffect } from 'react';
import type { FilterId } from './types';

export function useFilter() {
  const [isOpen, setIsOpen] = useState(false);
  const [appliedFilters, setAppliedFilters] = useState<Set<FilterId>>(new Set());
  const [tempFilters, setTempFilters] = useState<Set<FilterId>>(new Set());
  const [activeFilters, setActiveFilters] = useState<Set<FilterId>>(new Set());

  useEffect(() => {
    if (isOpen) {
      setTempFilters(new Set(appliedFilters));
    }
  }, [isOpen]);

  const openFilter = () => setIsOpen(true);
  const closeFilter = () => {
    setTempFilters(new Set());
    setIsOpen(false);
  };

  const toggleFilter = (filterId: FilterId) => {
    setTempFilters((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(filterId)) {
        newSet.delete(filterId);
      } else {
        newSet.add(filterId);
      }
      return newSet;
    });
  };

  const clearAllFilters = () => {
    setTempFilters(new Set());
  };

  const clearAppliedFilters = () => {
    setAppliedFilters(new Set());
    setTempFilters(new Set());
    setActiveFilters(new Set());
  };

  const confirmFilter = () => {
    setAppliedFilters(new Set(tempFilters));
    setActiveFilters((prev) => {
      const newSet = new Set<FilterId>();
      prev.forEach((filterId) => {
        if (tempFilters.has(filterId)) {
          newSet.add(filterId);
        }
      });
      return newSet;
    });
    closeFilter();
  };

  const toggleActiveFilter = (filterId: FilterId) => {
    setActiveFilters((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(filterId)) {
        newSet.delete(filterId);
      } else {
        newSet.add(filterId);
      }
      return newSet;
    });
    // TODO: 재고지도/카테고리 영역에 필터 적용
  };

  return {
    isOpen,
    openFilter,
    closeFilter,
    appliedFilters, 
    tempFilters,
    activeFilters,
    toggleFilter, 
    clearAllFilters,
    clearAppliedFilters,
    confirmFilter,
    toggleActiveFilter,
  };
}
