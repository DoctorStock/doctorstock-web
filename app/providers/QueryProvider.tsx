'use client';

// 외부
import { QueryClientProvider } from '@tanstack/react-query';
import { useEffect } from 'react';

// 내부 모듈
import { queryClient } from '@/app/lib/configs/queryClient';
import { configAxiosInterceptor } from '@/app/lib/configs/interceptors';

// ===== Export =====
export default function QueryProvider({ children }: { children: React.ReactNode }) {
  // 앱 시작 시 인터셉터 초기화
  useEffect(() => {
    configAxiosInterceptor();
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  );
}