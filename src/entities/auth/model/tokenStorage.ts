import { AUTH_STORAGE_KEYS } from '@/shared/config/auth';

/* =========================
   * Save Tokens
   ========================= */
export function saveTokens(
  accessToken: string,
  refreshToken: string,
  expiresIn: number,
  autoLogin: boolean
) {
  localStorage.setItem(AUTH_STORAGE_KEYS.ACCESS_TOKEN, accessToken);

  if (expiresIn) {
    const expiresAt = Date.now() + expiresIn * 1000;
    localStorage.setItem(
      AUTH_STORAGE_KEYS.ACCESS_TOKEN_EXPIRES_AT,
      expiresAt.toString()
    );
  }

  if (autoLogin) {
    localStorage.setItem(AUTH_STORAGE_KEYS.REFRESH_TOKEN, refreshToken);
    sessionStorage.removeItem(AUTH_STORAGE_KEYS.REFRESH_TOKEN);
  } else {
    localStorage.removeItem(AUTH_STORAGE_KEYS.REFRESH_TOKEN);
    sessionStorage.setItem(AUTH_STORAGE_KEYS.REFRESH_TOKEN, refreshToken);
  }
}

/* =========================
   * update Tokens
   ========================= */
export function updateTokens(
  accessToken: string,
  refreshToken: string,
  expiresIn: number,
  autoLogin: boolean
) {
  if (accessToken) {
    localStorage.setItem(AUTH_STORAGE_KEYS.ACCESS_TOKEN, accessToken);
  }

  if (expiresIn) {
    const newExpiresAt = Date.now() + expiresIn * 1000;
    localStorage.setItem(
      AUTH_STORAGE_KEYS.ACCESS_TOKEN_EXPIRES_AT,
      newExpiresAt.toString()
    );
  }

  if (refreshToken) {
    if (autoLogin) {
      localStorage.setItem(AUTH_STORAGE_KEYS.REFRESH_TOKEN, refreshToken);
    } else {
      sessionStorage.setItem(AUTH_STORAGE_KEYS.REFRESH_TOKEN, refreshToken);
    }
  }
}

/* =========================
 * AuthStorage clearing
 ========================= */
export function clearAuthTokens(): void {
  Object.values(AUTH_STORAGE_KEYS).forEach((key) => {
    localStorage.removeItem(key);
    sessionStorage.removeItem(key);
  });
}
