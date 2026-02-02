import axios from 'axios';
import type {
  PasswordResetRequest,
  PasswordResetResponse,
} from '@/entities/auth/model/types';

export const passwordResetApi = async (
  payload: PasswordResetRequest,
): Promise<PasswordResetResponse> => {
  const { data } = await axios.post('/api/auth/change-password', payload);

  return data;
};
