import { LOGIN_ERROR_MESSAGES } from '@/app/constants/loginErrorMessages';
import { ErrorCode } from '../error/errorCodes';

export const getLoginErrorMessages = (errorCode?: ErrorCode) => {
  switch (errorCode) {
    case 'RESIGNED_USER':
      return LOGIN_ERROR_MESSAGES.RESIGNED;
    case 'INVALID_CREDENTIALS':
    case 'LOGIN_FAILED':
    case 'UNAUTHORIZED':
    case 'FORBIDDEN':
    case 'SERVER_ERROR':
    default:
      return LOGIN_ERROR_MESSAGES.DEFAULT;
  }
};
