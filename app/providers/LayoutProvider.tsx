'use client';

import { usePathname } from 'next/navigation';
import Header from '../components/Header/Header';
import Sidebar from '../components/Sidebar/Sidebar';
import styles from '../layout.module.css';

export default function LayoutProvider({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isLoginPage = pathname === '/pages/login';

  if (isLoginPage) {
    return <>{children}</>;
  }

  return (
    <div className={styles.page}>
      <Header/>
      <div className={styles.content}>
        <Sidebar/>
        <main className={styles.main}>
          {children}
        </main>
      </div>
    </div>
  );
}

