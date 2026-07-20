import { Edit3 } from 'lucide-react';
import Avatar from '../../atoms/Avatar/Avatar';
import Button from '../../atoms/Button/Button';
import ProgressBar from '../../atoms/ProgressBar/ProgressBar';
import styles from './ProfileHeader.module.css';

export default function ProfileHeader({ user, onEdit }) {
  if (!user) return null;

  const xpPercent = Math.min((user.currentXP / user.nextLevelXP) * 100, 100);

  return (
    <div className={styles.headerCard}>
      
      <div className={styles.avatarSection}>
        <Avatar
          src={user.avatar}
          name={user.name}
          size="xxl"
          glow
          glowVariant="cyan"
        />
        <Button
          variant="secondary"
          size="sm"
          icon={<Edit3 size={14} />}
          onClick={onEdit}
        >
          Edit Profile
        </Button>
      </div>

      
      <div className={styles.profileInfo}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: 'var(--space-4)' }}>
          <div className={styles.infoBlock}>
            <h2 className={styles.name}>{user.name}</h2>
            <div className={styles.title}>{user.title}</div>
            <div className={styles.location}>{user.location}</div>
            <p className={styles.bio}>{user.bio}</p>
          </div>
          
          
          <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: 'var(--space-4)' }}>
            <div className={styles.statsGrid}>
              <div className={styles.statItem}>
                <div className={styles.statLabel}>Level</div>
                <div className={styles.statValue}>{user.level}</div>
              </div>
              <div className={styles.statItem}>
                <div className={styles.statLabel}>Total XP</div>
                <div className={styles.statValue}>{user.totalXP}</div>
              </div>
              <div className={styles.statItem}>
                <div className={styles.statLabel}>Badges</div>
                <div className={styles.statValue}>{user.badges}</div>
              </div>
              <div className={styles.statItem}>
                <div className={styles.statLabel}>Certificates</div>
                <div className={styles.statValue}>{user.certificates}</div>
              </div>
            </div>

            
            <div className={styles.xpProgressSection}>
              <div className={styles.xpDetails}>
                <span className={styles.xpLabel}>Next Level</span>
                <span className={styles.xpValue}>{user.currentXP} / {user.nextLevelXP} XP</span>
              </div>
              <ProgressBar
                value={user.currentXP}
                max={user.nextLevelXP}
                showValue={false}
                variant="cyan"
                size="lg"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
