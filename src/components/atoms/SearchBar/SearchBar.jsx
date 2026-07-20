import { Search } from 'lucide-react';
import styles from './SearchBar.module.css';

export default function SearchBar({
  placeholder = 'Search...',
  value,
  onChange,
  glass = false,
  className = '',
}) {
  return (
    <div className={`${styles.searchBar} ${className}`}>
      <span className={styles.icon}>
        <Search size={16} />
      </span>
      <input
        type="text"
        className={`${styles.input} ${glass ? styles.glass : ''}`}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
    </div>
  );
}
