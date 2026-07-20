import { Link, useLocation } from 'react-router-dom';
import { Menu, Bell } from 'lucide-react';
import { useAuth } from '../../../context/AuthContext';
import { useNotifications } from '../../../context/NotificationContext';
import SearchBar from '../../atoms/SearchBar/SearchBar';
import Avatar from '../../atoms/Avatar/Avatar';
import styles from './TopNav.module.css';

const pageMap = {
  '/dashboard': { title: 'Dashboard', subtitle: 'Your learning command center' },
  '/dashboard/missions': { title: 'Mission Control', subtitle: 'Manage your active courses and missions' },
  '/dashboard/vault': { title: 'Knowledge Vault', subtitle: 'Manage your schedule and deadlines' },
  '/dashboard/library': { title: 'Galaxy Library', subtitle: 'Explore resource planets across all sectors' },
  '/dashboard/objectives': { title: 'Mission Objectives', subtitle: 'Track your educational targets and flight metrics' },
  '/dashboard/analytics': { title: 'Performance Observatory', subtitle: 'Analyze cognitive growth and learning velocity' },
  '/dashboard/coach': { title: 'AI Study Coach', subtitle: 'Your personal AI-powered learning assistant' },
  '/dashboard/profile': { title: 'Your Profile', subtitle: 'Manage your academy profile and track your journey' },
  '/dashboard/notifications': { title: 'Notification Center', subtitle: 'Stay updated with your latest activity' },
  '/dashboard/command': { title: 'Command Center', subtitle: 'Configure your academy experience' },
  '/dashboard/notes': { title: 'Notes', subtitle: 'Your personal academy note database' },
};

export default function TopNav({ isCollapsed, toggleMobile }) {
  const { user } = useAuth();
  const { unreadCount } = useNotifications();
  const location = useLocation();

  const page = pageMap[location.pathname] || { title: 'Dashboard', subtitle: '' };

  return (
    <header className={`${styles.topnav} ${isCollapsed ? styles.collapsed : ''}`}>
      <div className={styles.leftSection}>
        <button
          className={styles.menuBtn}
          onClick={toggleMobile}
          aria-label="Open navigation menu"
        >
          <Menu size={24} />
        </button>
        <div className={styles.pageHeader}>
          <h1 className={styles.title}>{page.title}</h1>
        </div>
      </div>

      <div className={styles.rightSection}>
        <SearchBar className={styles.search} placeholder="Search resources..." glass />

        <div className={styles.actions}>
          <Link to="/dashboard/notifications" className={styles.actionBtn} aria-label="Notifications">
            <Bell size={18} />
            {unreadCount > 0 && <span className={styles.badge}>{unreadCount}</span>}
          </Link>
        </div>

        {user && (
          <Link to="/dashboard/profile" className={styles.userSnippet}>
            <div className={styles.userInfo}>
              <div className={styles.userName}>{user.name}</div>
              <div className={styles.userRole}>{user.title?.split('|')[0]?.trim()}</div>
            </div>
            <Avatar
              src={user.avatar}
              name={user.name}
              size="md"
              glow
              glowVariant="purple"
            />
          </Link>
        )}
      </div>
    </header>
  );
}
