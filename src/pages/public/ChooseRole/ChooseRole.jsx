import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { GraduationCap, Users, Shield, ArrowRight } from 'lucide-react';
import PublicLayout from '../../../components/layouts/PublicLayout/PublicLayout';
import Button from '../../../components/atoms/Button/Button';
import { useAuth } from '../../../context/AuthContext';
import styles from './ChooseRole.module.css';

const roleIcons = {
  Student: GraduationCap,
  Instructor: Users,
  Admin: Shield,
};

export default function ChooseRole() {
  const navigate = useNavigate();
  const { chooseRole } = useAuth();
  const [selected, setSelected] = useState('student');

  const handleProceed = () => {
    chooseRole(selected);
    navigate('/dashboard');
  };

  const roleCards = [
    {
      id: 'student',
      title: 'Student',
      description: 'Access courses, track progress, earn badges, and get AI-powered study assistance.',
      icon: GraduationCap,
      color: 'var(--neon-cyan)',
      glow: 'var(--shadow-glow-cyan)',
    },
    {
      id: 'instructor',
      title: 'Instructor',
      description: 'Create courses, manage students, track analytics, and build learning paths.',
      icon: Users,
      color: 'var(--primary-purple)',
      glow: 'var(--shadow-glow-purple)',
    },
    {
      id: 'admin',
      title: 'Admin',
      description: 'Manage the platform, users, content, and system-wide settings.',
      icon: Shield,
      color: 'var(--primary-blue)',
      glow: 'var(--shadow-glow-blue)',
    },
  ];

  return (
    <PublicLayout maxWidth="800px">
      <div className={styles.container}>
        <div className={styles.header}>
          <div className={styles.logoBadge}>L</div>
          <h1 className={styles.title}>Establish Academy Sector</h1>
          <p className={styles.subtitle}>Select your operational interface role</p>
        </div>

        <div className={styles.grid}>
          {roleCards.map((role) => {
            const IconComp = role.icon;
            const isSelected = selected === role.id;
            return (
              <div
                key={role.id}
                className={`${styles.card} ${isSelected ? styles.activeCard : ''}`}
                onClick={() => setSelected(role.id)}
                style={{
                  '--accent-color': role.color,
                  '--glow-shadow': role.glow,
                }}
              >
                <div className={`${styles.iconBox} ${isSelected ? styles.activeIconBox : ''}`}>
                  <IconComp size={28} />
                </div>
                <h3 className={styles.cardTitle}>{role.title}</h3>
                <p className={styles.cardDesc}>{role.description}</p>
              </div>
            );
          })}
        </div>

        <div className={styles.actions}>
          <Button
            size="lg"
            onClick={handleProceed}
            icon={<ArrowRight size={18} />}
            iconPosition="right"
          >
            Launch Operational Interface
          </Button>
        </div>
      </div>
    </PublicLayout>
  );
}
