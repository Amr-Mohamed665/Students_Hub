import styles from './CircularProgress.module.css';

export default function CircularProgress({
  value = 0,
  max = 100,
  size = 80,
  label,
  showValue = true,
  glow = false,
  sizeVariant = 'md',
  className = '',
}) {
  const strokeWidth = sizeVariant === 'lg' ? 6 : 4;
  const radius = (size - strokeWidth * 2) / 2;
  const circumference = 2 * Math.PI * radius;
  const percentage = Math.min(Math.max((value / max) * 100, 0), 100);
  const dashOffset = circumference - (percentage / 100) * circumference;

  return (
    <div className={`${styles.wrapper} ${styles[sizeVariant]} ${glow ? styles.glow : ''} ${className}`}>
      <svg className={styles.svg} width={size} height={size}>
        <defs>
          <linearGradient id="progressGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#7C3AED" />
            <stop offset="50%" stopColor="#3B82F6" />
            <stop offset="100%" stopColor="#06D6E0" />
          </linearGradient>
        </defs>
        <circle
          className={styles.trackCircle}
          cx={size / 2}
          cy={size / 2}
          r={radius}
        />
        <circle
          className={styles.fillCircle}
          cx={size / 2}
          cy={size / 2}
          r={radius}
          strokeDasharray={circumference}
          strokeDashoffset={dashOffset}
        />
      </svg>
      <div className={styles.center}>
        {showValue && <span className={styles.centerValue}>{Math.round(percentage)}%</span>}
        {label && <span className={styles.centerLabel}>{label}</span>}
      </div>
    </div>
  );
}
