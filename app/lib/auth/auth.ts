export const AUTH_STORAGE_KEYS = {
  SAVED_ID: 'savedUserId',
  AUTO_LOGIN: 'autoLogin',
  ACCESS_TOKEN: 'accessToken',
  REFRESH_TOKEN: 'refreshToken',
} as const;

//임시로 최고관리지 아이디 둠(유효성 검사 통과 예외)
export const SUPER_ADMIN_ID = '권미리';

export const saveUserId = (userId: string) => {
  localStorage.setItem(AUTH_STORAGE_KEYS.SAVED_ID, userId);
};

export const getSavedUserId = (): string | null => {
  return localStorage.getItem(AUTH_STORAGE_KEYS.SAVED_ID);
};

export const removeSavedId = () => {
  localStorage.removeItem(AUTH_STORAGE_KEYS.SAVED_ID);
};

export const validatePassword = (
  password: string,
  options?: { skip?: boolean }
): boolean => {
  if (options?.skip) return true;

  const hasLetter = /[a-zA-Z]/.test(password);
  const hasNumber = /[0-9]/.test(password);
  const hasSpecial = /[!@#$%^&*(),.?":{}|<>]/.test(password);

  return password.length >= 8 && hasLetter && hasNumber && hasSpecial;
};
