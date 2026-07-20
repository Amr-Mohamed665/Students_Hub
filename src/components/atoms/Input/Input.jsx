import { forwardRef } from 'react';
import styles from './Input.module.css';

const Input = forwardRef(function Input({
  label,
  type = 'text',
  placeholder,
  leftIcon,
  rightIcon,
  onRightIconClick,
  error,
  className = '',
  textarea = false,
  ...props
}, ref) {
  const Tag = textarea ? 'textarea' : 'input';

  return (
    <div className={`${styles.inputWrapper} ${error ? styles.error : ''} ${className}`}>
      {label && <label className={styles.label}>{label}</label>}
      <div className={styles.inputContainer}>
        {leftIcon && <span className={styles.leftIcon}>{leftIcon}</span>}
        <Tag
          ref={ref}
          type={textarea ? undefined : type}
          placeholder={placeholder}
          className={`${styles.input} ${leftIcon ? styles.hasLeftIcon : ''} ${rightIcon ? styles.hasRightIcon : ''} ${textarea ? styles.textarea : ''}`}
          {...props}
        />
        {rightIcon && (
          <span
            className={`${styles.rightIcon} ${onRightIconClick ? styles.rightIconClickable : ''}`}
            onClick={onRightIconClick}
          >
            {rightIcon}
          </span>
        )}
      </div>
      {error && <span className={styles.errorMessage}>{error}</span>}
    </div>
  );
});

export default Input;
