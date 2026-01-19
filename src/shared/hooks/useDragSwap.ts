import { useCallback } from 'react';
import type { DragEvent } from 'react';

type DragSwapPayload = {
  index: number;
  type: string;
};

const DRAG_SWAP_MIME = 'application/x-drag-swap';

// Drag시 데이터 설정
function setDragPayload(event: DragEvent<HTMLElement>, payload: DragSwapPayload) {
  event.dataTransfer.setData(DRAG_SWAP_MIME, JSON.stringify(payload)); 
  event.dataTransfer.effectAllowed = 'move';
}

// Drag시 데이터 가져오기
function getDragPayload(event: DragEvent<HTMLElement>) {
  const raw = event.dataTransfer.getData(DRAG_SWAP_MIME);
  if (!raw) return null;
  try {
    return JSON.parse(raw) as DragSwapPayload;
  } catch {
    return null;
  }
}

export function useDragSwap(options: { type: string; onSwap: (from: number, to: number) => void }) {
  const handleDragStart = useCallback(
    (index: number) => (event: DragEvent<HTMLElement>) => {
      setDragPayload(event, { type: options.type, index });
    },
    [options.type]
  );

  const handleDragOver = useCallback((event: DragEvent<HTMLElement>) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  }, []);

  const handleDrop = useCallback(
    (index: number) => (event: DragEvent<HTMLElement>) => {
      event.preventDefault();
      const payload = getDragPayload(event);
      if (!payload || payload.type !== options.type) return;
      if (payload.index === index) return;
      options.onSwap(payload.index, index);
    },
    [options]
  );

  return { handleDragStart, handleDragOver, handleDrop };
}

