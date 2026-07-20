import { Brain, Sparkles, Code, GraduationCap, Trophy } from 'lucide-react';
import styles from './OrbitalDisplay.module.css';

export default function OrbitalDisplay() {
  return (
    <div className={styles.container}>

      <div className={styles.starField} />

      <div className={styles.coreGlow} />

      <div className={styles.centerCore}>
        <div className={styles.coreIcon}>
          <Brain size={32} />
        </div>
      </div>

      <div className={styles.orbitRing1}>
        <div className={`${styles.satellite} ${styles.sat1}`} title="Education">
          <GraduationCap size={14} />
        </div>
      </div>

      <div className={styles.orbitRing2}>
        <div className={`${styles.satellite} ${styles.sat2}`} title="AI Skills">
          <Sparkles size={14} />
        </div>
        <div className={`${styles.satellite} ${styles.sat4}`} title="Programming">
          <Code size={14} />
        </div>
      </div>

      <div className={styles.orbitRing3}>
        <div className={`${styles.satellite} ${styles.sat3}`} title="Achievements">
          <Trophy size={14} />
        </div>
        <div className={`${styles.satellite} ${styles.sat5}`} title="Coding Tasks">
          <Brain size={14} />
        </div>
      </div>
    </div>
  );
}
