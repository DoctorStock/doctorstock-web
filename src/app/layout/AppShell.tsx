import { Outlet } from 'react-router-dom';
import Header from '@/widgets/header';
import Sidebar from '@/widgets/sidebar';
import styles from './AppShell.module.css';

export default function AppShell() {
  return (
    <div className={styles.container}>
      <Header />
      <div className={styles.content}>
        <Sidebar />
        <main className={styles.main}>
          <Outlet />
        </main>
      </div>
    </div>
  );
}