// 내부 모듈
import { apiClient } from '@/app/lib/configs/axios';
import { BaseResponse } from '@/app/api/types';

// ===== 타입 정의 =====
export interface LoginRequest {
  name: string;
  password: string;
}

// 로그인 Response 데이터
export interface LoginData {
  accessToken: string;
  refreshToken: string;
  expiresIn: number;
}

// 로그인 응답 (BaseResponse 형식 또는 직접 토큰 형식)
export type LoginResponse = BaseResponse<LoginData> | LoginData;

// ===== Export =====
// 로그인 API
// Swagger: POST /api/auth/login
export const login = async (data: LoginRequest): Promise<LoginData> => {
  const response = await apiClient.post<LoginResponse>('/api/auth/login', data);
  
  console.log('로그인 API 응답:', response.data);
  
  // 응답 데이터 확인
  const responseData = response.data;
  
  // BaseResponse 형식인 경우 (data 속성이 있는 경우)
  if ('data' in responseData && responseData.data) {
    return responseData.data;
  }
  
  // LoginData 형식인 경우 (accessToken이 직접 있는 경우)
  if ('accessToken' in responseData) {
    return responseData as LoginData;
  }
  
  // 예상치 못한 형식
  throw new Error('예상치 못한 응답 형식입니다.');
};