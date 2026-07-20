import { useNavigate } from 'react-router-dom';
import { ChevronLeft, ChevronRight, LogOut } from 'lucide-react';
import * as Icons from 'lucide-react';
import { sidebarNavItems } from '../../../data/mockData';
import NavItem from '../../molecules/NavItem/NavItem';
import styles from './Sidebar.module.css';

export default function Sidebar({ isOpen, toggleMobile, isCollapsed, toggleCollapse }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate('/landing');
  };

  return (
    <aside className={`${styles.sidebar} ${isCollapsed ? styles.collapsed : ''} ${isOpen ? styles.mobileOpen : ''}`}>
      
      <div className={styles.brand}>
        <div className={styles.logoWrapper}>S</div>
        {!isCollapsed && <span className={styles.logoText}>Students Hub</span>}
      </div>

      
      <button className={styles.toggleBtn} onClick={toggleCollapse} aria-label="Toggle Sidebar">
        {isCollapsed ? <ChevronRight size={14} /> : <ChevronLeft size={14} />}
      </button>

      
      <nav className={styles.navSection}>
        {sidebarNavItems.map((item) => {
          const LucideIcon = Icons[item.icon] || Icons.HelpCircle;
          return (
            <NavItem
              key={item.id}
              icon={<LucideIcon size={20} />}
              label={item.label}
              path={item.path}
              collapsed={isCollapsed}
            />
          );
        })}
      </nav>

      
      <div className={styles.sidebarFooter}>
        <button className={styles.logoutBtn} onClick={handleLogout} title="Logout">
          <LogOut size={18} />
          {!isCollapsed && <span>Logout</span>}
        </button>
      </div>
    </aside>
  );
}
