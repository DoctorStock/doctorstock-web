import axios from 'axios';
import type { LoginResponse } from '@/features/auth/login';
import type { LoginRequest } from '@/entities/auth';

export const loginApi = async (
  payload: LoginRequest,
): Promise<LoginResponse> => {
  const { data } = await axios.post('/api/auth/login', payload);

  return data;
};
