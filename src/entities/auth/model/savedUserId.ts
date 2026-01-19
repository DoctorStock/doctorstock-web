import { AUTH_STORAGE_KEYS } from '@/shared/config/auth';

/* =========================
   * Saved ID
   ========================= */
export const saveUserId = (userId: string) => {
  localStorage.setItem(AUTH_STORAGE_KEYS.SAVED_ID, userId);
};

export const getSavedUserId = (): string | null => {
  return localStorage.getItem(AUTH_STORAGE_KEYS.SAVED_ID);
};

export const removeSavedId = () => {
  localStorage.removeItem(AUTH_STORAGE_KEYS.SAVED_ID);
};
