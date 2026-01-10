import { Link } from 'react-router-dom';
import styles from './Logo.module.css';

interface LogoProps {
  to?: string;
}

export const Logo = ({ to = '/home' }: LogoProps) => {
  return (
    <Link to={to} className={styles.logo}>
      <img
        src="/assets/logo.svg"
        alt="Doctor Stock"
        className={styles.logoIcon}
      />
      <img
        src="/assets/logo-text.svg"
        alt="Doctor Stock"
        className={styles.logoText}
      />
    </Link>
  );
};
