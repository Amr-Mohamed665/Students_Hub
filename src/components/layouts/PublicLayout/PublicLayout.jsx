import GlowOrb from '../../atoms/GlowOrb/GlowOrb';
import styles from './PublicLayout.module.css';

export default function PublicLayout({ children, maxWidth = '480px' }) {
  return (
    <div className={styles.layout}>

      <div className={styles.stars} />

      <GlowOrb color="purple" size="lg" top="-50px" left="-50px" />
      <GlowOrb color="blue" size="lg" bottom="-100px" right="-100px" />
      <GlowOrb color="cyan" size="md" top="40%" right="10%" />

      <div className={styles.content} style={{ maxWidth }}>
        {children}
      </div>
    </div>
  );
}
