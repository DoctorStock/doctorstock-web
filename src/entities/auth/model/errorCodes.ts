export const AuthErrorCode = {
  INVALID_CREDENTIALS: 'INVALID_CREDENTIALS', //400
  BAD_REQUEST: 'BAD_REQUEST', //400
  UNAUTHORIZED: 'UNAUTHORIZED', //401
  FORBIDDEN: 'FORBIDDEN', //403
  NOT_FOUND: 'NOT_FOUND', //404
  RESIGNED_USER: 'RESIGNED_USER', //404(퇴사처리)

  SERVER_ERROR: 'SERVER_ERROR', //500
  LOGIN_FAILED: 'LOGIN_FAILED', //500
} as const;

export type AuthErrorCode = (typeof AuthErrorCode)[keyof typeof AuthErrorCode];
