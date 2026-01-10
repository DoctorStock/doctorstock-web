import type { UserRole } from '../lib/roles';

export interface User {
  id: string;
  name: string;
  role: UserRole;
  hospitalId: string | null;
}
