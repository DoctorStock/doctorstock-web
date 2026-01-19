import { useEffect } from 'react';
import type { RefObject } from 'react';

// 외부 클릭 이벤트 핸들러
export function useClickOutside<T extends Element = Element>(
  ref: RefObject<T>,
  handler: () => void,
  isEnabled: boolean = true
) {
  useEffect(() => {
    if (!isEnabled) return;

    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        handler();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [ref, handler, isEnabled]);
}

