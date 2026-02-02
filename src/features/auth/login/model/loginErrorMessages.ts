import { AuthErrorCode } from '@/entities/auth';

export const LOGIN_ERROR_MESSAGES = {
  DEFAULT: '아이디 또는 비밀번호를 다시 확인해 주세요.',
  RESIGNED: '퇴사 처리된 계정입니다. 관리자에게 문의하세요.',
} as const;

export function getLoginErrorMessage(errorCode?: string): string {
  switch (errorCode) {
    case AuthErrorCode.RESIGNED_USER:
      return LOGIN_ERROR_MESSAGES.RESIGNED;

    case AuthErrorCode.INVALID_CREDENTIALS:
    case AuthErrorCode.UNAUTHORIZED:
    case AuthErrorCode.FORBIDDEN:
    case AuthErrorCode.LOGIN_FAILED:
    case AuthErrorCode.SERVER_ERROR:
    default:
      return LOGIN_ERROR_MESSAGES.DEFAULT;
  }
}
