'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import styles from './page.module.css';

export default function Sidebar() {
  const pathName = usePathname();
  const isActive = pathName === '/';

  return (
    <aside className={styles.sidebar}>
      <nav className={styles.nav}>
        <Link 
          href="/" 
          className={`${styles.menuItem} ${isActive ? styles.active : ''}`}
        >
          <img
            src="/assets/home.svg"
            alt="홈"
            width={20}
            height={20}
          />
          홈
        </Link>
      </nav>
    </aside>
  );
}

