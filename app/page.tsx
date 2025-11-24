import styles from "./page.module.css";
import Header from "./components/layout/Header/page";

export default function Home() {
  return (
    <div className={styles.page}>
      <Header/>
      <div>메인 페이지</div>
    </div>
  );
}
