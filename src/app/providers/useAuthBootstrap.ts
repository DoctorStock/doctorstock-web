import { useTokenRefresh } from '@/features/auth/session';
import { useEffect, useRef } from 'react';

export function useAuthBootstrap() {
  const { checkAutoLogin } = useTokenRefresh();
  //앱 시작시 1회만 실행
  const ranRef = useRef(false);

  useEffect(() => {
    if (ranRef.current) return;
    ranRef.current = true;

    checkAutoLogin();
  }, [checkAutoLogin]);
}
