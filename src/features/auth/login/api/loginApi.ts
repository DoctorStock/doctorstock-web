import type { LoginCredentials } from '@/entities/auth';
import axios from 'axios';

export const loginApi = async (credentials: LoginCredentials) => {
  const { data } = await axios.post('/api/auth/login', {
    name: credentials.userId,
    password: credentials.userPassword,
  });

  return data;
};
