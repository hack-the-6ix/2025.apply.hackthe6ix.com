import React, { useState, useRef, useEffect } from "react";
import cn from "classnames";
import styles from "./Dropdown.module.scss";

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
  backgroundColor?: string;
  textColor?: string;
  menuBackgroundColor?: string;
  menuTextColor?: string;
  hoverColor?: string;
}

const Dropdown: React.FC<DropdownProps> = ({
  options,
  value,
  onChange,
  label,
  placeholder = "Select",
  error,
  helperText,
  fullWidth = false,
  disabled = false,
  className,
  backgroundColor = "#ffffff",
  textColor = "#111827",
  menuBackgroundColor = "#ffffff",
  menuTextColor = "#111827",
  hoverColor
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState(value || "");
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Function to darken a hex color
  const darkenColor = (hex: string, amount: number = 20) => {
    // Remove the # if present
    hex = hex.replace("#", "");

    // Convert to RGB
    let r = parseInt(hex.substring(0, 2), 16);
    let g = parseInt(hex.substring(2, 4), 16);
    let b = parseInt(hex.substring(4, 6), 16);

    // If the color is white (or very close to white), convert to a light gray
    if (r > 240 && g > 240 && b > 240) {
      return "#F3F4F6"; // Light gray color
    }

    // Darken each component
    r = Math.max(0, r - amount);
    g = Math.max(0, g - amount);
    b = Math.max(0, b - amount);

    // Convert back to hex
    return `#${r.toString(16).padStart(2, "0")}${g
      .toString(16)
      .padStart(2, "0")}${b.toString(16).padStart(2, "0")}`;
  };

  // Use provided hoverColor or calculate a darker shade of menuBackgroundColor
  const defaultHoverColor = darkenColor(menuBackgroundColor, 10);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelect = (option: string) => {
    setSelectedValue(option);
    onChange(option);
    setIsOpen(false);
  };

  return (
    <div className={styles.container} ref={dropdownRef}>
      {label && (
        <label className={cn(styles.label, { [styles.error]: error })}>
          {label}
        </label>
      )}
      <div
        className={cn(styles.trigger, {
          [styles.open]: isOpen,
          [styles.error]: error,
          [styles.disabled]: disabled
        })}
        style={{ backgroundColor, color: textColor }}
        onClick={() => !disabled && setIsOpen(!isOpen)}
        role="button"
        tabIndex={0}
      >
        <span
          className={cn(styles.value, { [styles.selected]: selectedValue })}
        >
          {selectedValue || placeholder}
        </span>
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          style={{
            transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
            transition: "transform 0.2s ease-in-out"
          }}
        >
          <path
            d="M6 9L12 15L18 9"
            stroke={textColor}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
      {isOpen && (
        <div
          className={styles.menu}
          style={
            {
              backgroundColor: menuBackgroundColor,
              color: menuTextColor,
              "--hover-color": hoverColor || defaultHoverColor,
              "--selected-text-color": textColor
            } as React.CSSProperties
          }
        >
          {options.map((option) => (
            <div
              key={option.value}
              className={cn(styles.option, {
                [styles.selected]: option.value === selectedValue
              })}
              onClick={() => handleSelect(option.label)}
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
