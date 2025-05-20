import React, { useState, useRef, useEffect } from 'react';
import cn from 'classnames';
import styles from './Dropdown.module.scss';

export interface DropdownOption {
  value: string;
  label: string;
}

export interface DropdownProps {
  options: DropdownOption[];
  value?: string;
  onChange: (value: string) => void;
  label?: string;
  placeholder?: string;
  error?: string;
  helperText?: string;
  fullWidth?: boolean;
  disabled?: boolean;
  className?: string;
}

const Dropdown: React.FC<DropdownProps> = ({
  options,
  value,
  onChange,
  label,
  placeholder = 'Select',
  error,
  helperText,
  fullWidth = false,
  disabled = false,
  className,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState(value || "");
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelect = (option: string) => {
    setSelectedValue(option);
    onChange(option);
    setIsOpen(false);
  };

  return (
    <div className={styles.container} ref={dropdownRef}>
      {label && <label className={cn(styles.label, { [styles.error]: error })}>{label}</label>}
      <div
        className={cn(styles.trigger, {
          [styles.open]: isOpen,
          [styles.error]: error,
          [styles.disabled]: disabled,
        })}
        onClick={() => !disabled && setIsOpen(!isOpen)}
        role="button"
        tabIndex={0}
      >
        <span className={cn(styles.value, { [styles.selected]: selectedValue })}>
          {selectedValue || placeholder}
        </span>
        <svg 
          width="12" 
          height="8" 
          viewBox="0 0 12 8" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg"
          className={`transition-transform ${isOpen ? 'rotate-180' : ''}`}
        >
          <path 
            d="M1 1.5L6 6.5L11 1.5" 
            stroke="#6B7280" 
            strokeWidth="1.5" 
            strokeLinecap="round" 
            strokeLinejoin="round"
          />
        </svg>
      </div>
      {isOpen && (
        <div className={styles.menu}>
          {options.map((option) => (
            <div
              key={option.value}
              className={cn(styles.option, {
                [styles.selected]: option.value === selectedValue,
              })}
              onClick={() => handleSelect(option.value)}
              role="button"
              tabIndex={0}
            >
              {option.label}
            </div>
          ))}
        </div>
      )}
      {(error || helperText) && (
        <span className={cn(styles.helperText, { [styles.error]: error })}>
          {error || helperText}
        </span>
      )}
    </div>
  );
};

export default Dropdown; 