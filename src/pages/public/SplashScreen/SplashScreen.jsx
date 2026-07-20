import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Atom, Bot, Target, Library, Calendar } from 'lucide-react';
import styles from './SplashScreen.module.css';

export default function SplashScreen() {
  const navigate = useNavigate();
  const [progress, setProgress] = useState(0);

  useEffect(() => {

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        const diff = Math.floor(Math.random() * 15) + 5;
        return Math.min(prev + diff, 100);
      });
    }, 150);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (progress >= 100) {
      const timer = setTimeout(() => {
        const isAuthenticated = localStorage.getItem('learnova_authenticated') === 'true';
        if (isAuthenticated) {
          navigate('/dashboard');
        } else {
          navigate('/landing');
        }
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [progress, navigate]);

  return (
    <div className={styles.container}>

      <div className={styles.ambientGlow1} />
      <div className={styles.ambientGlow2} />

      <div className={styles.logoSection}>
        <div className={styles.outerRing}>
          <div className={styles.innerRing}>
            <div className={styles.atomLogo}>
              <Atom size={52} className={styles.atomIcon} />
            </div>
          </div>
        </div>
        <h1 className={styles.logoText}>Students Hub</h1>
        <p className={styles.tagline}>Your AI-Powered Learning Universe</p>
      </div>

      <div className={styles.progressContainer}>
        <div className={styles.statusText}>INITIALIZING LEARNING MATRIX...</div>
        <div className={styles.progressRow}>
          <div className={styles.loadingTrack}>
            <div className={styles.loadingProgress} style={{ width: `${progress}%` }} />
          </div>
          <span className={styles.percentText}>{progress}%</span>
        </div>
      </div>

      <div className={styles.modulesFooter}>
        <div className={styles.moduleItem}>
          <div className={styles.moduleIconBox}>
            <Bot size={18} />
          </div>
          <span className={styles.moduleLabel}>AI Coach</span>
        </div>
        <div className={styles.moduleItem}>
          <div className={styles.moduleIconBox}>
            <Target size={18} />
          </div>
          <span className={styles.moduleLabel}>Mission Control</span>
        </div>
        <div className={styles.moduleItem}>
          <div className={styles.moduleIconBox}>
            <Library size={18} />
          </div>
          <span className={styles.moduleLabel}>Galaxy Library</span>
        </div>
        <div className={styles.moduleItem}>
          <div className={styles.moduleIconBox}>
            <Calendar size={18} />
          </div>
          <span className={styles.moduleLabel}>Knowledge Vault</span>
        </div>
      </div>
    </div>
  );
}
