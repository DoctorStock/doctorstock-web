import { apiClient } from '@/shared/api/axios';
import type { LoginResponse } from '@/features/auth/login';
import type { LoginRequest } from '@/entities/auth';

export const loginApi = async (
  payload: LoginRequest,
): Promise<LoginResponse> => {
  const { data } = await apiClient.post('/auth/login', payload);

  return data;
};
