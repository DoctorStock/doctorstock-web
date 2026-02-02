import { apiClient } from '@/shared/api/axios';
import type {
  PasswordResetRequest,
  PasswordResetResponse,
} from '@/entities/auth/model/types';

export const passwordResetApi = async (
  payload: PasswordResetRequest,
): Promise<PasswordResetResponse> => {
  const { data } = await apiClient.post('/auth/change-password', payload);

  return data;
};
