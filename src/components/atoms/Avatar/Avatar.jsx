import styles from './Avatar.module.css';

export default function Avatar({
  src,
  alt = '',
  name = '',
  size = 'md',
  glow = false,
  glowVariant = 'purple',
  status,
  className = '',
}) {
  const getInitials = (name) => {
    return name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .slice(0, 2);
  };

  const glowClass = glow
    ? glowVariant === 'cyan' ? styles.glowRingLg : styles.glowRing
    : '';

  return (
    <div className={`${styles.avatar} ${styles[size]} ${glowClass} ${className}`}>
      {src ? (
        <img src={src} alt={alt || name} />
      ) : (
        <div className={styles.fallback}>
          {getInitials(name || 'U')}
        </div>
      )}
      {status && (
        <span className={`${styles.statusDot} ${styles[status]}`} />
      )}
    </div>
  );
}
