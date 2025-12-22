import { API_ERROR_MESSAGES } from '../constants/apiErrors';

export const getApiErrorMessage = (
  statusCode: number,
  errorCode?: string
): string => {
  if (errorCode && errorCode in API_ERROR_MESSAGES) {
    return API_ERROR_MESSAGES[errorCode as keyof typeof API_ERROR_MESSAGES];
  }

  switch (statusCode) {
    case 401:
      return API_ERROR_MESSAGES.DEFAULT_401;
    case 403:
      return API_ERROR_MESSAGES.DEFAULT_403;
    case 500:
      return API_ERROR_MESSAGES.DEFAULT_500;
    default:
      return API_ERROR_MESSAGES.DEFAULT;
  }
};
