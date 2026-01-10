export const USER_ROLE_LABELS = {
  SUPER_ADMIN: '슈퍼 관리자',
  ADMIN: '관리자',
  STAFF: '사용자',
} as const;

export type UserRole = keyof typeof USER_ROLE_LABELS;

export const getUserRoleLabel = (role: string): string => {
  return role in USER_ROLE_LABELS
    ? USER_ROLE_LABELS[role as UserRole]
    : role;
};
