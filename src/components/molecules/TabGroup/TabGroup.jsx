import styles from './TabGroup.module.css';

export default function TabGroup({ tabs, activeTab, onTabChange, variant = 'pill', className = '' }) {
  return (
    <div className={`${styles.tabGroup} ${variant === 'flat' ? styles.flat : ''} ${className}`}>
      {tabs.map((tab) => (
        <button
          key={tab.id || tab}
          className={`${styles.tab} ${activeTab === (tab.id || tab) ? styles.active : ''}`}
          onClick={() => onTabChange(tab.id || tab)}
        >
          {tab.label || tab}
        </button>
      ))}
    </div>
  );
}
