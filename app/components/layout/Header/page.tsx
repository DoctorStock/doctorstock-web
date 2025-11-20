'use client';

import styles from './page.module.css';

/**
 * 헤더 컴포넌트 - 로고/브랜드 영역
 */
export default function Header() {
  return (
    <div className={styles.header}>
      <div className={styles.logo}>
        <span className={styles.logoText}>Doctor Stock</span>
      </div>
    </div>
  );
}
