'use client';

// 외부
import { QueryClientProvider } from '@tanstack/react-query';

// 내부 모듈
import { queryClient } from '@/app/lib/configs/queryClient';

// ===== Export =====
export default function QueryProvider({ children }: { children: React.ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  );
}