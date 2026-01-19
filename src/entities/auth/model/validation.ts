export interface PasswordValidationOptions {
  skip?: boolean;
}

export const validatePassword = (
  password: string,
  options: PasswordValidationOptions = {}
): boolean => {
  if (options?.skip) return true;

  const hasLetter = /[a-zA-Z]/.test(password);
  const hasNumber = /[0-9]/.test(password);
  const hasSpecial = /[!@#$%^&*(),.?":{}|<>]/.test(password);

  return password.length >= 8 && hasLetter && hasNumber && hasSpecial;
};
