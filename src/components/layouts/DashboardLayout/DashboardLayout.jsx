import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../../organisms/Sidebar/Sidebar';
import TopNav from '../../organisms/TopNav/TopNav';
import StarField from '../../atoms/GlowOrb/StarField';
import styles from './DashboardLayout.module.css';

export default function DashboardLayout() {
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  const toggleMobileSidebar = () => {
    setMobileSidebarOpen(!mobileSidebarOpen);
  };

  const toggleSidebarCollapse = () => {
    setSidebarCollapsed(!sidebarCollapsed);
  };

  return (
    <div className={styles.layout}>
      
      <StarField count={60} />

      
      <Sidebar
        isOpen={mobileSidebarOpen}
        toggleMobile={toggleMobileSidebar}
        isCollapsed={sidebarCollapsed}
        toggleCollapse={toggleSidebarCollapse}
      />

      
      {mobileSidebarOpen && (
        <div className={styles.backdrop} onClick={toggleMobileSidebar} />
      )}

      
      <div className={`${styles.mainContent} ${sidebarCollapsed ? styles.collapsedContent : ''}`}>
        <TopNav
          isCollapsed={sidebarCollapsed}
          toggleMobile={toggleMobileSidebar}
        />
        <main className={styles.pageContainer}>
          <Outlet />
        </main>
      </div>
    </div>
  );
}
