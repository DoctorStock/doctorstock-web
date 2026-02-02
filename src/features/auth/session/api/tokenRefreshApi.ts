import axios from 'axios';

export const tokenRefreshApi = async (refreshToken: string) => {
  const { data } = await axios.post('/api/auth/refresh', { refreshToken });
  return data;
};
