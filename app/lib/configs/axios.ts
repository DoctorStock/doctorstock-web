import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';

export const BASE_URL = process.env.BACKEND_API_URL || '';

export const apiClient: AxiosInstance = axios.create({
  baseURL: BASE_URL,
  timeout: 10000, // 10 초
  headers: { 'Content-Type': 'application/json' },
});
