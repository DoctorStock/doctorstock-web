// 외부
import { QueryClient } from '@tanstack/react-query';

// ===== 상수 =====
const queryClientConfig = {
  defaultOptions: {
    queries: {
      retry: 1, // 실패한 쿼리 재시도 횟수
      staleTime: 1000 * 60 * 30, // 쿼리 데이터가 stale로 간주되는 시간 (30분)
      gcTime: 1000 * 60 * 60, // 캐시에서 데이터를 유지하는 시간 (1시간)
      refetchOnWindowFocus: false, // 윈도우 포커스 시, 자동 refetch 비활성화
      refetchOnReconnect: false, // 네트워크 재연결 시, 자동 refetch 비활성화
    },
    mutations: {
      retry: 1, // 실패한 mutation 재시도 횟수
    },
  },
};

// ===== Export =====
export const queryClient = new QueryClient(queryClientConfig);