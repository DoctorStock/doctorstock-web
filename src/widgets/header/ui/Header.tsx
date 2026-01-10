import { Logo } from '@/shared/ui/logo';
import { NotificationModal } from '@/features/notification/ui/NotificationModal';
import { UserMenu } from '@/features/auth/ui/UserMenu';
import styles from './Header.module.css';

export default function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.logo}>
        <Logo to="/home" />
      </div>

      <div className={styles.userMenu}>
        <NotificationModal />
        <UserMenu />
      </div>
    </header>
  );
}
