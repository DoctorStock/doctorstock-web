export const AUTH_STORAGE_KEYS = {
  SAVED_ID: "savedUserId",
  AUTO_LOGIN: "autoLogin",
  ACCESS_TOKEN: "accessToken",
  REFRESH_TOKEN: "refreshToken",
} as const;

export const saveUserId = (userId: string) => {
  localStorage.setItem(AUTH_STORAGE_KEYS.SAVED_ID, userId);
};

export const getSavedUserId = (): string | null => {
  return localStorage.getItem(AUTH_STORAGE_KEYS.SAVED_ID);
};

export const removeSavedId = () => {
  localStorage.removeItem(AUTH_STORAGE_KEYS.SAVED_ID);
};
