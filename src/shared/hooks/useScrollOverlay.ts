import { useState, useRef, useEffect } from 'react';

export function useScrollOverlay() {
  const listRef = useRef<HTMLDivElement>(null);
  const [showOverlay, setShowOverlay] = useState(false);

  useEffect(() => {
    const listElement = listRef.current;
    if (!listElement) return;

    const checkScroll = () => {
      const { scrollTop, scrollHeight, clientHeight } = listElement;
      const canScroll = scrollHeight > clientHeight;
      
      if (!canScroll) {
        setShowOverlay(false);
        return;
      }

      const remainingScroll = scrollHeight - scrollTop - clientHeight;
      const isAtBottom = remainingScroll <= 1;
      setShowOverlay(!isAtBottom);
    };

    checkScroll();
    
    listElement.addEventListener('scroll', checkScroll, { passive: true });
    window.addEventListener('resize', checkScroll);

    return () => {
      listElement.removeEventListener('scroll', checkScroll);
      window.removeEventListener('resize', checkScroll);
    };
  }, []);

  return {
    listRef,
    showOverlay,
  };
}

