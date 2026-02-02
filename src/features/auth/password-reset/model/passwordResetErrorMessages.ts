import { AuthErrorCode } from '@/entities/auth';

export const PASSWORD_RESET_ERROR_MESSAGES = {
  INVALID_CREDENTIALS: '아이디 또는 비밀번호를 다시 확인해 주세요.',
  DEFAULT: '비밀번호 변경을 실패했습니다. 관리자에게 문의해주세요.',
} as const;

export function getPasswordResetErrorMessage(
  errorCode?: AuthErrorCode
): string {
  switch (errorCode) {
    case AuthErrorCode.BAD_REQUEST:
    case AuthErrorCode.UNAUTHORIZED:
    case AuthErrorCode.FORBIDDEN:
    case AuthErrorCode.NOT_FOUND:
      return PASSWORD_RESET_ERROR_MESSAGES.INVALID_CREDENTIALS;

    case AuthErrorCode.SERVER_ERROR:
    default:
      return PASSWORD_RESET_ERROR_MESSAGES.DEFAULT;
  }
}
