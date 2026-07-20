import { useEffect } from 'react';
import { X } from 'lucide-react';
import styles from './Modal.module.css';

export default function Modal({ isOpen, onClose, title, subtitle, maxWidth = '480px', children }) {

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };

    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);

      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className={styles.modalOverlay} onClick={onClose}>
      <div
        className={styles.modal}
        style={{ maxWidth }}
        onClick={(e) => e.stopPropagation()}
      >

        <div className={styles.modalHeader}>
          <div>
            <h2 className={styles.modalTitle}>{title}</h2>
            {subtitle && <p className={styles.modalSubtitle}>{subtitle}</p>}
          </div>
          <button className={styles.modalClose} onClick={onClose} aria-label="Close">
            <X size={18} />
          </button>
        </div>

        <div className={styles.modalBody}>
          {children}
        </div>
      </div>
    </div>
  );
}
