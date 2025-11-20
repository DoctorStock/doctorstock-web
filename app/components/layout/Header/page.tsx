'use client';

import Image from 'next/image';
import Link from 'next/link';
import styles from './page.module.css';

export default function Header() {
  return (
    <div className={styles.header}>
      <Link href="/" className={styles.logo}>
        <Image
          src="/assets/doctorStock_icon.png"
          alt="Doctor Stock"
          width={26}
          height={26}
          className={styles.logoIcon}
        />
        <span className={styles.logoText}>Doctor Stock</span>
      </Link>
    </div>
  );
}
