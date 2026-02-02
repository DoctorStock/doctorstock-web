import type { AuthErrorCode } from './errorCodes';

/* =====================
 * Request / Form
 * ===================== */

export interface LoginCredentials {
  userId: string;
  userPassword: string;
}

export interface LoginRequest {
  loginId: string;
  password: string;
}

export interface PasswordResetRequest {
  loginId: string;
  currentPassword: string;
  newPassword: string;
}

/* =====================
 * Domain
 * ===================== */

export interface AuthUser {
  id: string;
  loginId: string;
  name: string;
  role: string;
  hospitalId: string;
  active: boolean;
}

export interface AuthTokens {
  accessToken: string;
  refreshToken: string;
  expiresIn: number;
}

/* =====================
 * Error
 * ===================== */

export interface AuthError {
  code: AuthErrorCode;
  message?: string;
}

/* =====================
 * Response
 * ===================== */

export interface LoginResponse {
  success: boolean;
  data?: AuthTokens & {
    user: AuthUser;
  };
  error?: AuthError;
}

export interface PasswordResetResponse {
  success: boolean;
  error?: AuthError;
}
