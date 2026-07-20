import { Link } from 'react-router-dom';
import { ArrowRight, Brain, Shield, Award, Sparkles } from 'lucide-react';
import PublicLayout from '../../../components/layouts/PublicLayout/PublicLayout';
import Button from '../../../components/atoms/Button/Button';
import { landingFeatures } from '../../../data/mockData';
import styles from './LandingPage.module.css';

const featureIcons = {
  Brain: Brain,
  Library: Sparkles,
  Target: Award,
  BarChart3: Shield,
};

export default function LandingPage() {
  return (
    <PublicLayout maxWidth="900px">
      <div className={styles.container}>
        
        <header className={styles.header}>
          <div className={styles.logoGroup}>
            <div className={styles.logoBadge}>S</div>
            <span className={styles.logoText}>Students Hub</span>
          </div>
          <div className={styles.authLinks}>
            <Link to="/splash" className={styles.navLink}>Dashboard</Link>
            <Link to="/splash">
              <Button size="sm">Get Started</Button>
            </Link>
          </div>
        </header>

        
        <section className={styles.hero}>
          <h1 className={styles.title}>
            Master Your Skills
          </h1>
          <p className={styles.subtitle}>
            Embark on educational missions, access cosmic learning resources, and consult your personal AI Study Coach in our futuristic learning dashboard.
          </p>
          <div className={styles.ctas}>
            <Link to="/splash">
              <Button size="lg" icon={<ArrowRight size={18} />} iconPosition="right">
                Launch Academy
              </Button>
            </Link>
            <Link to="/splash">
              <Button size="lg" variant="secondary">
                Access Mission Control
              </Button>
            </Link>
          </div>
        </section>

        
        <section className={styles.features}>
          <h2 className={styles.featuresTitle}>Academic Mission Capabilities</h2>
          <div className={styles.grid}>
            {landingFeatures.map((feat) => {
              const IconComp = featureIcons[feat.icon] || Brain;
              return (
                <div key={feat.id} className={styles.featureCard}>
                  <div className={styles.iconBox}>
                    <IconComp size={24} />
                  </div>
                  <h3 className={styles.cardTitle}>{feat.title}</h3>
                  <p className={styles.cardDesc}>{feat.description}</p>
                </div>
              );
            })}
          </div>
        </section>

        
        <footer className={styles.footer}>
          <p>&copy; {new Date().getFullYear()} Students Hub. All systems operational. Safe travels.</p>
        </footer>
      </div>
    </PublicLayout>
  );
}
