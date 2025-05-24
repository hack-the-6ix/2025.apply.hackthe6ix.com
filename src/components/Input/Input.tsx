import React from 'react';
import cn from 'classnames';
import styles from './Input.module.scss';

export type InputType = 'text' | 'email' | 'password' | 'number' | 'tel' | 'url';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: string;
  helperText?: string;
  fullWidth?: boolean;
  multiline?: boolean;
  rows?: number;
  className?: string;
  backgroundColor?: string;
  textColor?: string;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      error,
      helperText,
      fullWidth = false,
      multiline = false,
      rows = 3,
      className,
      placeholder = 'johndoeuniversity.com',
      backgroundColor = 'white',
      textColor = '#111827',
      ...props
    },
    ref
  ) => {
    const inputClasses = cn(
      styles.input,
      {
        [styles.error]: error,
        [styles.fullWidth]: fullWidth,
      },
      className
    );

    const helperClasses = cn(styles.helperText, {
      [styles.error]: error,
    });

    const inputStyle = {
      backgroundColor,
      color: textColor,
      '--placeholder-color': textColor === 'white' ? 'rgba(255, 255, 255, 0.7)' : '#9E9E9E',
    } as React.CSSProperties;

    return (
      <div className={styles.container}>
        {multiline ? (
          <textarea
            className={inputClasses}
            style={inputStyle}
            rows={rows}
            placeholder={placeholder}
            {...(props as React.TextareaHTMLAttributes<HTMLTextAreaElement>)}
          />
        ) : (
          <input
            ref={ref}
            className={inputClasses}
            style={inputStyle}
            placeholder={placeholder}
            {...props}
          />
        )}
        {(error || helperText) && (
          <span className={helperClasses}>{error || helperText}</span>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';

export default Input; 