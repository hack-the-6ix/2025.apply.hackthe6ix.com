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
  placeholder = 'Select an option',
  error,
  helperText,
  fullWidth = false,
  disabled = false,
  className,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const selectedOption = options.find((option) => option.value === value);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelect = (optionValue: string) => {
    onChange(optionValue);
    setIsOpen(false);
  };

  const containerClasses = cn(styles.container, {
    [styles.fullWidth]: fullWidth,
    [styles.disabled]: disabled,
  });

  const triggerClasses = cn(styles.trigger, {
    [styles.error]: error,
    [styles.open]: isOpen,
  });

  const labelClasses = cn(styles.label, {
    [styles.error]: error,
  });

  const helperClasses = cn(styles.helperText, {
    [styles.error]: error,
  });

  return (
    <div className={containerClasses} ref={dropdownRef}>
      {label && <label className={labelClasses}>{label}</label>}
      <div
        className={triggerClasses}
        onClick={() => !disabled && setIsOpen(!isOpen)}
        role="button"
        tabIndex={0}
      >
        <span className={styles.value}>
          {selectedOption ? selectedOption.label : placeholder}
        </span>
        <span className={styles.arrow} />
      </div>
      {isOpen && (
        <div className={styles.menu}>
          {options.map((option) => (
            <div
              key={option.value}
              className={cn(styles.option, {
                [styles.selected]: option.value === value,
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
        <span className={helperClasses}>{error || helperText}</span>
      )}
    </div>
  );
};

export default Dropdown; 