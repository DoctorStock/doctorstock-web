'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import styles from './page.module.css';

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className={styles.sidebar}>
      <nav className={styles.nav}>
        {/* 홈 메뉴 */}
        <Link 
          href="/" 
          className={`${styles.menuItem} ${pathname === '/' ? styles.active : ''}`}
        >
          <img
            src="/assets/home.svg"
            alt="홈"
            width={20}
            height={20}
          />
          홈
        </Link>

        {/* 재고관리 섹션 */}
        <div className={styles.section}>
          <h3 className={styles.sectionTitle}>재고 관리</h3>
          <div className={styles.menuList}>
            {/* 재고관리 메뉴 아이템들은 여기에 추가 */}
          </div>
        </div>

        {/* 부가 기능 섹션 */}
        <div className={styles.section}>
          <h3 className={styles.sectionTitle}>부가 기능</h3>
          <div className={styles.menuList}>
            {/* 부가 기능 메뉴 아이템들은 여기에 추가 */}
          </div>
        </div>
      </nav>
    </aside>
  );
}

