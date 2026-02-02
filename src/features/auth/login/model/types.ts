import type { AuthUser } from '@/entities/auth/';

export interface LoginSuccessResponse {
  success: true;
  data: {
    accessToken: string;
    refreshToken: string;
    expiresIn: number;
    user: AuthUser;
  };
}

export interface LoginErrorResponse {
  success: false;
  error: {
    code: string;
    message: string;
  };
}

export type LoginResponse = LoginSuccessResponse | LoginErrorResponse;
