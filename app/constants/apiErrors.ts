export const API_ERROR_MESSAGES = {
  // 401 - 인증 실패
  INVALID_CREDENTIALS: '아이디 또는 비밀번호를 다시 확인해 주세요.',
  RESIGNED_USER: '퇴사 처리된 계정입니다. 관리자에게 문의하세요.',
  INACTIVE_USER: '퇴사 처리된 계정입니다. 관리자에게 문의하세요.',
  TOKEN_BLACKLISTED: '로그아웃된 토큰입니다. 다시 로그인해 주세요.',

  // 403 - 접근 거부
  IP_NOT_ALLOWED: '허용되지 않은 IP입니다. 관리자에게 문의하세요.',
  INSUFFICIENT_PERMISSIONS: '접근 권한이 없습니다.',

  // 기본 메시지
  DEFAULT_401: '아이디 또는 비밀번호를 다시 확인해 주세요.',
  DEFAULT_403: '접근이 거부되었습니다.',
  DEFAULT_500: '서버 오류가 발생했습니다.',
  DEFAULT: '로그인에 실패했습니다.',
} as const;

export type ErrorCode = keyof typeof API_ERROR_MESSAGES;
