import { apiClient } from '@/shared/api/axios';

export const tokenRefreshApi = async (refreshToken: string) => {
  const { data } = await apiClient.post('/auth/refresh', { refreshToken });
  return data;
};
