import React from 'react';
import styles from './Checkbox.module.scss';

interface CheckboxProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label: string;
  backgroundColor?: string;
  textColor?: string;
}

const Checkbox: React.FC<CheckboxProps> = ({
  checked,
  onChange,
  label,
  backgroundColor = '#475D7B',
  textColor = 'white',
}) => {
  return (
    <label className={styles.container} style={{ color: textColor }}>
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        className={styles.input}
      />
      <div className={styles.checkbox} style={{ backgroundColor }}>
        {checked && (
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M10 3L4.5 8.5L2 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        )}
      </div>
      <span className={styles.label}>{label}</span>
    </label>
  );
};

export default Checkbox; 