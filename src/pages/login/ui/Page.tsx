import { Link } from 'react-router-dom';
import styles from './Page.module.css';
import { LoginForm } from '@/features/auth/login/ui/LoginForm';

function Page() {
  return (
    <div>
      <LoginForm />

      <div className={styles.footerInquiry}>
        <p>닥터스톡 이용 관련 문의가 있으신가요?</p>
        <Link to="/support">문의하기</Link>
      </div>
    </div>
  );
}

export default Page;
