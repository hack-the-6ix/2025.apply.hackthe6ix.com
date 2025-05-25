import React from 'react';
import cn from 'classnames';
import styles from './TextArea.module.scss';

export interface TextAreaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  error?: string;
  helperText?: string;
  fullWidth?: boolean;
  className?: string;
  backgroundColor?: string;
  textColor?: string;
  rows?: number;
  maxWords?: number;
  showWordCount?: boolean;
}

const TextArea: React.FC<TextAreaProps> = ({
  error,
  helperText,
  fullWidth = false,
  className,
  placeholder = 'Enter text here...',
  backgroundColor = '#475D7B',
  textColor = 'white',
  rows = 10,
  maxWords = 200,
  showWordCount = true,
  value = '',
  onChange,
  ...props
}) => {
  const wordCount = value.toString().trim().split(/\s+/).filter(Boolean).length;
  const isOverLimit = wordCount > maxWords;

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const words = e.target.value.trim().split(/\s+/).filter(Boolean);
    if (words.length <= maxWords) {
      onChange?.(e);
    }
  };

  const textareaClasses = cn(
    styles.textarea,
    {
      [styles.error]: error || isOverLimit,
      [styles.fullWidth]: fullWidth,
    },
    className
  );

  const helperClasses = cn(styles.helperText, {
    [styles.error]: error || isOverLimit,
  });

  const textareaStyle = {
    backgroundColor,
    color: textColor,
    '--placeholder-color': textColor === 'white' ? 'rgba(255, 255, 255, 0.7)' : '#9E9E9E',
  } as React.CSSProperties;

  return (
    <div className={styles.container}>
      <textarea
        className={textareaClasses}
        style={textareaStyle}
        rows={rows}
        placeholder={placeholder}
        value={value}
        onChange={handleChange}
        {...props}
      />
      <div className={styles.helperContainer}>
        {(error || helperText) && (
          <span className={helperClasses}>{error || helperText}</span>
        )}
        {showWordCount && (
          <span className={cn(styles.wordCount, { [styles.error]: isOverLimit })}>
            {wordCount}/{maxWords} words
          </span>
        )}
      </div>
    </div>
  );
};

export default TextArea; 