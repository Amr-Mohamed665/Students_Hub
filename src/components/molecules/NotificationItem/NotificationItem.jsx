import * as Icons from 'lucide-react';
import styles from './NotificationItem.module.css';

export default function NotificationItem({ notification, onClick }) {
  const { id, title, description, time, read, icon, color } = notification;

  
  const LucideIcon = Icons[icon] || Icons.Bell;

  return (
    <div
      className={`${styles.item} ${!read ? styles.unread : ''}`}
      onClick={() => onClick && onClick(id)}
    >
      <div
        className={styles.iconBox}
        style={{
          backgroundColor: `${color}25`, 
          color: color,
        }}
      >
        <LucideIcon size={20} />
      </div>
      <div className={styles.content}>
        <div className={styles.title}>{title}</div>
        <div className={styles.description}>{description}</div>
      </div>
      <div className={styles.time}>{time}</div>
      {!read && <div className={styles.dot} />}
    </div>
  );
}
