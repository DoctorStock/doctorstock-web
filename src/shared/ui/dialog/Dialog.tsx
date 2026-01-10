import type { ReactNode } from 'react';
import styles from './Dialog.module.css';

interface DialogProps {
  title: string;
  children: ReactNode;
  cancelText?: string;
  confirmText?: string;
  footerLeft?: ReactNode;
  onCancel?: () => void;
  onConfirm?: () => void;
}

export function Dialog({
  title,
  children,
  cancelText = '취소',
  confirmText = '적용하기',
  footerLeft,
  onCancel,
  onConfirm,
}: DialogProps) {
  return (
    <div className={styles.overlay}>
      <div className={styles.dialog}>
        <div className={styles.header}>
          <h2 className={styles.title}>{title}</h2>
        </div>
        
        <div className={styles.content}>
          {children}
        </div>
        
        <div className={styles.footer}>
          {footerLeft && <div className={styles.footerLeft}>{footerLeft}</div>}
          <div className={styles.footerRight}>
            <button className={styles.cancelButton} onClick={onCancel}>
              {cancelText}
            </button>
            <button className={styles.confirmButton} onClick={onConfirm}>
              {confirmText}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

