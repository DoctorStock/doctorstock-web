export const AUTH_STORAGE_KEYS = {
  SAVED_ID: 'savedUserId',
  AUTO_LOGIN: 'autoLogin',
  ACCESS_TOKEN: 'accessToken',
  REFRESH_TOKEN: 'refreshToken',
  ACCESS_TOKEN_EXPIRES_AT: 'accessTokenExpiresAt',
} as const;

// 임시 최고 관리자 (비밀번호 검증 예외)
export const SUPER_ADMIN_ID = '권미리';
