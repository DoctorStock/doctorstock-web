import axios from 'axios';
import { AUTH_STORAGE_KEYS } from '../auth/auth';

export const axiosInstance = axios.create({
  baseURL: process.env.BACKEND_API_URL,
});

axiosInstance.interceptors.request.use(config => {
  const accessToken = localStorage.getItem(AUTH_STORAGE_KEYS.ACCESS_TOKEN);

  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }
  return config;
});
