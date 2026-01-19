import { getUserRoleLabel } from '@/entities/user/lib/roles';
import { useLogout } from '@/features/auth/logout/model/useLogout';
import { mockUserMenuData } from '@/shared/config/mocks'; // TODO: 실제 데이터로 변경
import styles from './UserMenu.module.css';

export function UserMenu() {
  const { handleLogout } = useLogout();
  const { user, hospital } = mockUserMenuData;
  const roleLabel = getUserRoleLabel(user.role);

  return (
    <div className={styles.userMenu}>
      <div className={styles.userInfo}>
        {hospital && (
          <span className={styles.hospitalName}>{hospital.name}</span>
        )}
        <span className={styles.userNameGroup}>
          <span className={styles.userName}>{user.name}</span>
          <span className={styles.userRole}>{roleLabel}님</span>
        </span>
      </div>

      <button onClick={handleLogout} className={styles.logoutButton}>
        로그아웃
      </button>
    </div>
  );
}
