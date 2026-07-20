import styles from './ProgressBar.module.css';

export default function ProgressBar({
  value = 0,
  max = 100,
  label,
  showValue = true,
  size = 'md',
  variant = 'purple',
  className = '',
}) {
  const percentage = Math.min(Math.max((value / max) * 100, 0), 100);

  return (
    <div className={`${styles.progressWrapper} ${styles[variant]} ${className}`}>
      {(label || showValue) && (
        <div className={styles.labelRow}>
          {label && <span className={styles.label}>{label}</span>}
          {showValue && <span className={styles.value}>{Math.round(percentage)}%</span>}
        </div>
      )}
      <div className={`${styles.track} ${size === 'lg' ? styles.trackLg : ''}`}>
        <div
          className={styles.fill}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}
