import type { PasswordResetCredentials } from '@/entities/auth';
import axios from 'axios';

export const passwordResetApi = async (
  credentials: PasswordResetCredentials
) => {
  const { data } = await axios.put(
    `/api/users/${credentials.userId}/password`,
    {
      currentPassword: credentials.currentPassword,
      newPassword: credentials.newPassword,
    }
  );
  return data;
};
