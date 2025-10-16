import Link from "next/link";
import styles from './layout.module.css';

export default function Layout({ children }: { children: React.ReactNode }) {
  return <div>
        {children}
        <div className={styles.footerInquiry}>
          <p>닥터스톡 이용 관련 문의가 있으신가요?</p>
          <Link href="/support" className={styles.footerInquiryLink}>
            문의하기
          </Link>
        </div>
    </div>;
}
