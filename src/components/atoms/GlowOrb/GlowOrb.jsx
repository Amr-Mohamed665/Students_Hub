import styles from './GlowOrb.module.css';

export default function GlowOrb({
  color = 'purple',
  size = 'md',
  top,
  left,
  right,
  bottom,
  style = {},
  className = '',
}) {
  return (
    <div
      className={`${styles.orb} ${styles[color]} ${styles[size]} ${className}`}
      style={{ top, left, right, bottom, ...style }}
    />
  );
}
