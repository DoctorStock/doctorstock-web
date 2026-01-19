export interface LoginCredentials {
  userId: string;
  userPassword: string;
}

export interface PasswordResetCredentials {
  userId: string;
  currentPassword: string;
  newPassword: string;
}
