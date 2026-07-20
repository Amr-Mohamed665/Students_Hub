import { useMemo } from 'react';
import styles from './StarField.module.css';

export default function StarField({ count = 80 }) {
  const stars = useMemo(() => {
    return Array.from({ length: count }, (_, i) => ({
      id: i,
      top: `${Math.random() * 100}%`,
      left: `${Math.random() * 100}%`,
      size: Math.random() * 2 + 0.5,
      duration: `${Math.random() * 4 + 2}s`,
      delay: `${Math.random() * 4}s`,
      opacity: Math.random() * 0.5 + 0.1,
    }));
  }, [count]);

  return (
    <div className={styles.starsLayer}>
      {stars.map((star) => (
        <div
          key={star.id}
          className={styles.star}
          style={{
            top: star.top,
            left: star.left,
            width: `${star.size}px`,
            height: `${star.size}px`,
            opacity: star.opacity,
            '--duration': star.duration,
            '--delay': star.delay,
          }}
        />
      ))}
    </div>
  );
}
