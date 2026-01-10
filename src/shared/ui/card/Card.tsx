import type { ReactNode } from 'react';
import styles from './Card.module.css';

interface CardProps {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
}

export const Card = ({ children, className = '', onClick }: CardProps) => {
  const cardClasses = `${styles.card} ${className}`.trim();

  return (
    <div className={cardClasses} onClick={onClick}>
      {children}
    </div>
  );
};
