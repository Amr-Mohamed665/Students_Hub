import * as Icons from 'lucide-react';
import { Circle, CheckCircle2, Trash2, Pencil } from 'lucide-react';
import ProgressBar from '../../atoms/ProgressBar/ProgressBar';
import Badge from '../../atoms/Badge/Badge';
import styles from './ObjectiveItem.module.css';

const colorMap = {
  0: styles.iconCyan,
  1: styles.iconPurple,
  2: styles.iconOrange,
  3: styles.iconBlue,
  4: styles.iconCyan,
};

const progressVariants = {
  0: 'cyan',
  1: 'purple',
  2: 'warning',
  3: 'blue',
  4: 'cyan',
};

const priorityVariants = {
  high: 'error',
  medium: 'warning',
  low: 'success',
};

export default function ObjectiveItem({ objective, index = 0, onToggleComplete, onEdit, onDelete }) {
  const { id, title, subtitle, progress, priority } = objective;
  const isCompleted = progress >= 100;

  const iconName = objective.icon || 'GraduationCap';
  const LucideIcon = Icons[iconName] || Icons.GraduationCap;

  const styleClass = colorMap[index % 5];
  const progressVar = progressVariants[index % 5];

  return (
    <div className={`${styles.item} ${isCompleted ? styles.completedItem : ''}`}>
      
      <button
        className={styles.toggleBtn}
        onClick={() => onToggleComplete && onToggleComplete(id)}
        title={isCompleted ? 'Mark Active' : 'Mark Completed'}
      >
        {isCompleted ? (
          <CheckCircle2 size={20} className={styles.checkedIcon} />
        ) : (
          <Circle size={20} className={styles.uncheckedIcon} />
        )}
      </button>

      <div className={`${styles.iconWrapper} ${styleClass}`}>
        <LucideIcon size={18} />
      </div>

      <div className={styles.content}>
        <div className={styles.header}>
          <div className={styles.textContainer}>
            <div className={styles.titleRow}>
              <h4 className={`${styles.title} ${isCompleted ? styles.completedTitle : ''}`}>{title}</h4>
              <Badge variant={priorityVariants[priority] || priorityVariants['medium']} className={styles.priorityBadge}>
                {priority || 'medium'}
              </Badge>
            </div>
            <div className={styles.subtitle}>{subtitle}</div>
          </div>
          <div className={styles.actionsRight}>
            <span className={styles.percentage}>{progress}%</span>
            {onEdit && (
              <button
                className={styles.editBtn}
                onClick={() => onEdit(objective)}
                title="Edit task"
              >
                <Pencil size={14} />
              </button>
            )}
            {onDelete && (
              <button
                className={styles.deleteBtn}
                onClick={() => onDelete(id)}
                title="Delete task"
              >
                <Trash2 size={14} />
              </button>
            )}
          </div>
        </div>
        <div className={styles.progressContainer}>
          <ProgressBar
            value={progress}
            max={100}
            showValue={false}
            variant={progressVar}
          />
        </div>
      </div>
    </div>
  );
}
