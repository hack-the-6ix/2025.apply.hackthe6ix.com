import React, { useState, useRef, useEffect } from "react";
import cn from "classnames";
import styles from "./Dropdown.module.scss";

export interface DropdownProps {
  options: string[];
  value?: string;
  onChange: (value: string) => void;
  label?: string;
  placeholder?: string;
  error?: string;
  helperText?: string;
  disabled?: boolean;
  theme?: "light" | "dark";
}

const Dropdown: React.FC<DropdownProps> = ({
  options,
  value,
  onChange,
  label,
  placeholder = "Select",
  error,
  helperText,
  disabled = false,
  theme = "light"
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const dropdownRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);

  const themeColors = {
    light: {
      backgroundColor: "#ffffff",
      textColor: "#111827",
      menuBackgroundColor: "#ffffff",
      menuTextColor: "#111827",
      selectedBackgroundColor: "#F3F4F6",
      selectedTextColor: "#111827",
      hoverColor: "#ffffff",
      borderColor: "#F9FAFB",
      activeBorderColor: "#d1d5db",
      activeBoxShadow: "0 0 0 2px rgba(107, 114, 128, 0.1)"
    },
    dark: {
      backgroundColor: "#1F2937",
      textColor: "#F9FAFB",
      menuBackgroundColor: "#1F2937",
      menuTextColor: "#F9FAFB",
      selectedBackgroundColor: "#4B5563",
      selectedTextColor: "#F9FAFB",
      hoverColor: "#374151",
      borderColor: "#111827",
      activeBorderColor: "#4B5563",
      activeBoxShadow: "0 0 0 2px rgba(0, 0, 0, 0.3)"
    }
  };

  const colors = themeColors[theme];

  const darkenColor = (hex: string, amount: number = 20) => {
    hex = hex.replace("#", "");
    let r = parseInt(hex.substring(0, 2), 16);
    let g = parseInt(hex.substring(2, 4), 16);
    let b = parseInt(hex.substring(4, 6), 16);

    if (r > 240 && g > 240 && b > 240) {
      return "#F3F4F6";
    }

    r = Math.max(0, r - amount);
    g = Math.max(0, g - amount);
    b = Math.max(0, b - amount);

    return `#${r.toString(16).padStart(2, "0")}${g
      .toString(16)
      .padStart(2, "0")}${b.toString(16).padStart(2, "0")}`;
  };

  const isColorLight = (hex: string) => {
    hex = hex.replace("#", "");
    const r = parseInt(hex.substring(0, 2), 16);
    const g = parseInt(hex.substring(2, 4), 16);
    const b = parseInt(hex.substring(4, 6), 16);
    const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
    return luminance > 0.5;
  };

  const resolvedSelectedBackgroundColor =
    colors.selectedBackgroundColor ||
    (isColorLight(colors.backgroundColor)
      ? "#F3F4F6"
      : darkenColor(colors.backgroundColor, 10));
  const resolvedSelectedTextColor =
    colors.selectedTextColor ||
    (isColorLight(colors.backgroundColor) ? colors.textColor : "#ffffff");

  const defaultHoverColor = darkenColor(colors.menuBackgroundColor, 10);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
        setSearchQuery("");
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    if (isOpen && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [isOpen]);

  const handleSelect = (option: string) => {
    onChange(option);
    setIsOpen(false);
    setSearchQuery("");
  };

  const filteredOptions = options.filter((option) =>
    option.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div
      className={styles.container}
      ref={dropdownRef}
      style={
        {
          "--border-color": colors.borderColor,
          "--active-border-color": colors.activeBorderColor,
          "--active-box-shadow": colors.activeBoxShadow
        } as React.CSSProperties
      }
    >
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
        style={{
          backgroundColor: value
            ? resolvedSelectedBackgroundColor
            : colors.backgroundColor,
          color: value ? resolvedSelectedTextColor : colors.textColor
        }}
        onClick={() => !disabled && setIsOpen(!isOpen)}
        role="button"
        tabIndex={0}
      >
        <span className={cn(styles.value, { [styles.selected]: value })}>
          {value || placeholder}
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
            stroke={value ? resolvedSelectedTextColor : colors.borderColor}
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
              backgroundColor: colors.menuBackgroundColor,
              color: colors.menuTextColor,
              "--hover-color": colors.hoverColor || defaultHoverColor,
              "--selected-option-text": resolvedSelectedTextColor,
              "--selected-option-bg": resolvedSelectedBackgroundColor,
              "--search-input-bg": colors.menuBackgroundColor,
              "--search-input-text": colors.menuTextColor,
              "--search-input-placeholder": darkenColor(
                colors.menuTextColor,
                30
              )
            } as React.CSSProperties
          }
        >
          <input
            ref={searchInputRef}
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className={styles.searchInput}
            placeholder="Search..."
            onClick={(e) => e.stopPropagation()}
            style={{ outline: "none" }}
          />
          {filteredOptions.map((option) => (
            <div
              key={option}
              className={cn(styles.option, {
                [styles.selected]: option === value
              })}
              onClick={() => handleSelect(option)}
              role="button"
              tabIndex={0}
            >
              {option}
            </div>
          ))}
          {filteredOptions.length === 0 && (
            <div className={styles.noResults}>No results found</div>
          )}
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
