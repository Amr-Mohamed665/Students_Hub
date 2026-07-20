import styles from './ChartCard.module.css';

export default function ChartCard({
  title,
  subtitle,
  actions,
  children,
  className = '',
}) {
  return (
    <div className={`${styles.card} ${className}`}>
      {(title || subtitle || actions) && (
        <div className={styles.header}>
          <div className={styles.titleGroup}>
            {title && <h3 className={styles.title}>{title}</h3>}
            {subtitle && <p className={styles.subtitle}>{subtitle}</p>}
          </div>
          {actions && <div className={styles.actions}>{actions}</div>}
        </div>
      )}
      <div className={styles.chartContainer}>
        {children}
      </div>
    </div>
  );
}
