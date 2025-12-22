// 외부
import axios, { AxiosInstance } from 'axios';

// ===== 상수 =====
export const BASE_URL = process.env.NEXT_PUBLIC_API_URL || '';

// ===== Export =====
export const apiClient: AxiosInstance = axios.create({
  baseURL: BASE_URL,
  timeout: 10000, // 10 초
  headers: { 'Content-Type': 'application/json' },
});
