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

    return (
      <div className={styles.container}>
        {multiline ? (
          <textarea
            className={inputClasses}
            rows={rows}
            placeholder={placeholder}
            {...(props as React.TextareaHTMLAttributes<HTMLTextAreaElement>)}
          />
        ) : (
          <input
            ref={ref}
            className={inputClasses}
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