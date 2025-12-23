import { LOGIN_ERROR_MESSAGES } from '@/app/constants/loginErrorMessages';
import { ErrorCode } from '../error/errorCodes';

export const getLoginErrorMessages = (errorCode?: ErrorCode) => {
  if (errorCode === 'RESIGNED_USER') {
    return LOGIN_ERROR_MESSAGES.RESIGNED;
  }

  return LOGIN_ERROR_MESSAGES.DEFAULT;
};
