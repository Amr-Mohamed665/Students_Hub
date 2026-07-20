import { useState } from 'react';
import { Bell, BookOpen, Trophy, AlertTriangle, RefreshCw, Settings, CheckCheck, Trash2 } from 'lucide-react';
import { useNotifications } from '../../../context/NotificationContext';
import NotificationItem from '../../../components/molecules/NotificationItem/NotificationItem';
import Button from '../../../components/atoms/Button/Button';
import styles from './NotificationCenter.module.css';

const TAB_FILTERS = [
  { id: 'all', label: 'All' },
  { id: 'unread', label: 'Unread' },
  { id: 'course', label: 'Courses' },
  { id: 'achievement', label: 'Achievements' },
  { id: 'system', label: 'System' },
];

const CATEGORY_ICONS = {
  course: { icon: BookOpen, color: '#3B82F6', label: 'Courses' },
  achievement: { icon: Trophy, color: '#F59E0B', label: 'Achievements' },
  assignment: { icon: AlertTriangle, color: '#EF4444', label: 'Deadlines' },
  update: { icon: RefreshCw, color: '#7C3AED', label: 'Updates' },
  system: { icon: Settings, color: '#64748B', label: 'System' },
};

export default function NotificationCenter() {
  const { notifications, unreadCount, markAsRead, markAllAsRead, clearAll } = useNotifications();
  const [activeTab, setActiveTab] = useState('all');

  const filtered = notifications.filter((n) => {
    if (activeTab === 'all') return true;
    if (activeTab === 'unread') return !n.read;
    if (activeTab === 'system') return n.type === 'system' || n.type === 'update';
    return n.type === activeTab;
  });

  const counts = notifications.reduce((acc, n) => {
    const key = ['system', 'update'].includes(n.type) ? 'system' : n.type;
    acc[key] = (acc[key] || 0) + 1;
    return acc;
  }, {});

  return (
    <div className={styles.container}>
      <div className={styles.layoutGrid}>

        <aside className={styles.sidebar}>
          <div className={styles.sideCard}>
            <h3 className={styles.sideTitle}>Inbox Summary</h3>

            <div className={styles.unreadBadge}>
              <div className={styles.unreadNum}>{unreadCount}</div>
              <div className={styles.unreadLabel}>Unread signals</div>
            </div>

            <div className={styles.statsGrid}>
              <div className={styles.statRow}>
                <span className={styles.statLabel}>Total</span>
                <span className={styles.statVal}>{notifications.length}</span>
              </div>
              <div className={styles.statRow}>
                <span className={styles.statLabel}>Read</span>
                <span className={styles.statVal}>{notifications.length - unreadCount}</span>
              </div>
            </div>

            <div className={styles.divider} />

            <div className={styles.categoryList}>
              <p className={styles.categoryHeading}>By Category</p>
              {Object.entries(CATEGORY_ICONS).map(([key, { icon: Icon, color, label }]) => (
                <button
                  key={key}
                  className={`${styles.categoryBtn} ${activeTab === key ? styles.activeCategoryBtn : ''}`}
                  onClick={() => setActiveTab(key === activeTab ? 'all' : key)}
                >
                  <span className={styles.categoryIcon} style={{ color }}>
                    <Icon size={15} />
                  </span>
                  <span className={styles.categoryLabel}>{label}</span>
                  {counts[key] > 0 && (
                    <span className={styles.categoryCount}>{counts[key]}</span>
                  )}
                </button>
              ))}
            </div>

            <div className={styles.divider} />

            <div className={styles.sideActions}>
              {unreadCount > 0 && (
                <Button variant="ghost" size="sm" icon={<CheckCheck size={14} />} onClick={markAllAsRead} fullWidth>
                  Mark All Read
                </Button>
              )}
              {notifications.length > 0 && (
                <Button variant="ghost" size="sm" icon={<Trash2 size={14} />} onClick={clearAll} fullWidth className={styles.dangerBtn}>
                  Clear All Logs
                </Button>
              )}
            </div>
          </div>
        </aside>

        <div className={styles.mainCol}>

          <div className={styles.tabBar}>
            {TAB_FILTERS.map((tab) => {
              const count = tab.id === 'all' ? notifications.length
                : tab.id === 'unread' ? unreadCount
                : tab.id === 'system' ? (counts['system'] || 0)
                : (counts[tab.id] || 0);
              return (
                <button
                  key={tab.id}
                  className={`${styles.tabBtn} ${activeTab === tab.id ? styles.activeTab : ''}`}
                  onClick={() => setActiveTab(tab.id)}
                >
                  {tab.label}
                  {count > 0 && (
                    <span className={`${styles.tabCount} ${tab.id === 'unread' ? styles.tabCountUnread : ''}`}>
                      {count}
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          <div className={styles.listCard}>
            {filtered.length > 0 ? (
              <div className={styles.list}>
                {filtered.map((notif) => (
                  <NotificationItem
                    key={notif.id}
                    notification={notif}
                    onClick={markAsRead}
                  />
                ))}
              </div>
            ) : (
              <div className={styles.emptyState}>
                <div className={styles.emptyIcon}>
                  <Bell size={40} />
                </div>
                <h3>All Clear</h3>
                <p>No notifications in this category. Systems are operating nominally.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
