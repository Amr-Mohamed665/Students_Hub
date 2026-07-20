import { NavLink } from 'react-router-dom';
import styles from './NavItem.module.css';

export default function NavItem({ icon, label, path, collapsed = false, onNavigate }) {
  return (
    <NavLink
      to={path}
      end={path === '/dashboard'}
      className={({ isActive }) =>
        `${styles.navItem} ${isActive ? styles.active : ''} ${collapsed ? styles.collapsed : ''}`
      }
      title={collapsed ? label : undefined}
      onClick={onNavigate}
    >
      <span className={styles.icon}>{icon}</span>
      <span className={styles.label}>{label}</span>
    </NavLink>
  );
}
