import { Clock, BookOpen, Zap } from 'lucide-react';
import ProgressBar from '../../atoms/ProgressBar/ProgressBar';
import Button from '../../atoms/Button/Button';
import Badge from '../../atoms/Badge/Badge';
import styles from './CourseCard.module.css';

export default function CourseCard({ course, onStart }) {
  const {
    title,
    instructor,
    progress,
    totalLessons,
    completedLessons,
    difficulty,
    duration,
    xp,
    videoUrl,
  } = course;

  const difficultyVariantMap = {
    Beginner: 'success',
    Intermediate: 'warning',
    Advanced: 'error',
  };

  const handleClick = () => {
    if (videoUrl) {
      window.open(videoUrl, '_blank');
    } else if (onStart) {
      onStart(course.id);
    }
  };

  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <div>
          <Badge variant={difficultyVariantMap[difficulty] || 'default'}>
            {difficulty}
          </Badge>
          <h3 className={styles.title} style={{ marginTop: 'var(--space-2)' }}>{title}</h3>
          <p className={styles.instructor}>by {instructor}</p>
        </div>
      </div>

      <div className={styles.metaGrid}>
        <div className={styles.metaItem}>
          <span className={styles.metaIcon}>
            <Clock size={14} />
          </span>
          <span>{duration}</span>
        </div>
        <div className={styles.metaItem}>
          <span className={styles.metaIcon}>
            <BookOpen size={14} />
          </span>
          <span>{completedLessons}/{totalLessons} Lessons</span>
        </div>
      </div>

      <ProgressBar
        value={progress}
        max={100}
        label="Course Progress"
        variant="purple"
      />

      <div className={styles.footer}>
        <span className={styles.xpBadge}>
          <Zap size={12} />
          {xp} XP
        </span>
        <Button size="sm" onClick={handleClick}>
          {progress > 0 ? 'Resume' : 'Start Mission'}
        </Button>
      </div>
    </div>
  );
}
