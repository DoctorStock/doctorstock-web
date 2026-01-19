export const LOGIN_ERROR_MESSAGES = {
  DEFAULT: '아이디 또는 비밀번호를 다시 확인해 주세요.',
  RESIGNED: '퇴사 처리된 계정입니다. 관리자에게 문의하세요.',
} as const;

export type ErrorCode =
  | 'INVALID_CREDENTIALS'
  | 'RESIGNED_USER'
  | 'UNAUTHORIZED'
  | 'FORBIDDEN'
  | 'SERVER_ERROR'
  | 'LOGIN_FAILED';

/**
 * 서버 ErrorCode → 사용자 노출 메시지 변환
 */

export function getLoginErrorMessages(errorCode?: ErrorCode): string {
  switch (errorCode) {
    case 'RESIGNED_USER':
      return LOGIN_ERROR_MESSAGES.RESIGNED;

    case 'INVALID_CREDENTIALS':
    case 'UNAUTHORIZED':
    case 'FORBIDDEN':
    case 'LOGIN_FAILED':
    case 'SERVER_ERROR':
    default:
      return LOGIN_ERROR_MESSAGES.DEFAULT;
  }
}
