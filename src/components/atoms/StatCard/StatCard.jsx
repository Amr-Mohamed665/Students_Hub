import { TrendingUp, TrendingDown, Activity } from 'lucide-react';
import styles from './StatCard.module.css';

const iconColors = ['purple', 'blue', 'cyan', 'green', 'orange'];

export default function StatCard({
  icon,
  label,
  value,
  subtitle,
  trend,
  trendUp = true,
  colorIndex = 0,
  className = '',
}) {
  const color = iconColors[colorIndex % iconColors.length];

  return (
    <div className={`${styles.card} ${className}`}>
      <div className={`${styles.iconBox} ${styles[color]}`}>
        {icon || <Activity size={20} />}
      </div>
      <div className={styles.content}>
        <div className={styles.label}>{label}</div>
        <div className={styles.value}>{value}</div>
        <div className={styles.footer}>
          {subtitle && <span className={styles.subtitle}>{subtitle}</span>}
          {trend && (
            <span className={`${styles.trend} ${trendUp ? styles.trendUp : styles.trendDown}`}>
              {trendUp ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
              {trend}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
