import styles from "./page.module.css";
import Header from "./components/layout/Header/page";
import Sidebar from "./components/layout/Sidebar/page";

export default function Home() {
  return (
    <div className={styles.page}>
      <Header/>
      <div className={styles.content}>
        <Sidebar/>
        <main className={styles.main}>
          {/* 메인 콘텐츠 영역 */}
        </main>
      </div>
    </div>
  );
}
