'use client';

import Image from 'next/image';
import Link from 'next/link';
import styles from './page.module.css';

export default function Header() {
  // TODO: 로그아웃 로직 구현
  const handleLogout = () => {
    console.log('로그아웃');
  };

  // TODO: 알림 클릭 로직 구현
  const handleNotification = () => {
    console.log('알림 클릭');
  };

  return (
    <div className={styles.header}>
      <Link href="/" className={styles.logo}>
        <Image
          src="/assets/logo.svg"
          alt="Doctor Stock"
          width={26}
          height={26}
          className={styles.logoIcon}
        />
        <span className={styles.logoText}>Doctor Stock</span>
      </Link>
      
      <div className={styles.rightSection}>
        <button
          onClick={handleNotification}
          className={styles.notificationButton}
          aria-label="알림"
        >
          <Image
            src="/assets/bell_on.svg"
            alt="알림"
            width={36}
            height={36}
          />
        </button>

        <button
          onClick={handleLogout}
          className={styles.logoutButton}
        >
          로그아웃
        </button>
      </div>
    </div>
  );
}
