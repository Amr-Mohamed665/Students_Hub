import styles from './TabGroup.module.css';

export default function TabGroup({ tabs, activeTab, onTabChange, variant = 'pill', className = '' }) {
  return (
    <div className={`${styles.container} ${className}`}>

      <select
        className={`${styles.selectMenu} ${variant === 'flat' ? styles.flatSelect : ''}`}
        value={activeTab}
        onChange={(e) => onTabChange(e.target.value)}
      >
        {tabs.map((tab) => (
          <option key={tab.id || tab} value={tab.id || tab}>
            {tab.label || tab}
          </option>
        ))}
      </select>

      <div className={`${styles.tabGroup} ${variant === 'flat' ? styles.flat : ''}`}>
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
    </div>
  );
}
