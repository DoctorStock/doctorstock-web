import styles from "./page.module.css";

export default function InventoryPage() {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>구매</h1>
      
      <div className={styles.dashboardBoxes}>
        <a href="/inventory/barcode" className={`${styles.box}`}>
          <h3>신규 구매 요청</h3>
        </a>
        
        <div className={styles.box}>
          <h3>구매 요청</h3>
          <span className={styles.count}>6 품목</span>
        </div>
        
        <div className={styles.box}>
          <h3>결제 승인</h3>
          <span className={styles.count}>3 품목</span>
        </div>
        
        <div className={styles.box}>
          <h3>입고 대기</h3>
          <span className={styles.count}>3 품목</span>
        </div>
      </div>
    </div>
  );
}
