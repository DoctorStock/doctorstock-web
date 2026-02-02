import { useCallback, useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { AUTH_STORAGE_KEYS } from '@/shared/config/auth';
import { clearAuthTokens, updateTokens } from '@/entities/auth/';
import { tokenRefreshApi } from '@/features/auth/session';

export function useTokenRefresh() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const refreshMutation = useMutation({ mutationFn: tokenRefreshApi });

  const checkAutoLogin = useCallback(async (): Promise<boolean> => {
    try {
      const accessToken = localStorage.getItem(AUTH_STORAGE_KEYS.ACCESS_TOKEN);
      const expiresAt = localStorage.getItem(
        AUTH_STORAGE_KEYS.ACCESS_TOKEN_EXPIRES_AT,
      );
      const autoLogin =
        localStorage.getItem(AUTH_STORAGE_KEYS.AUTO_LOGIN) === 'true';

      const refreshToken = autoLogin
        ? localStorage.getItem(AUTH_STORAGE_KEYS.REFRESH_TOKEN)
        : sessionStorage.getItem(AUTH_STORAGE_KEYS.REFRESH_TOKEN);

      if (!refreshToken) return false;

      if (accessToken && expiresAt && Date.now() < Number(expiresAt)) {
        setIsAuthenticated(true);
        return true;
      }

      const data = await refreshMutation.mutateAsync(refreshToken);

      if (!data.success) {
        clearAuthTokens();
        return false;
      }

      updateTokens(
        data.accessToken,
        data.refreshToken,
        data.expiresAt,
        autoLogin,
      );

      setIsAuthenticated(true);
      return true;
    } catch (error) {
      console.error('auto login error', error);
      clearAuthTokens();
      return false;
    }
  }, [refreshMutation]);

  return {
    isAuthenticated,
    checkAutoLogin,
  };
}
