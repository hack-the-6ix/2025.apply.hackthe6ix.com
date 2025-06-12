import React, { useRef } from "react";
import styles from "./FileUpload.module.scss";

interface FileUploadProps {
  onChange: (file: File | null) => void;
  value: File | null;
  accept?: string;
  backgroundColor?: string;
  textColor?: string;
}

const FileUpload: React.FC<FileUploadProps> = ({
  onChange,
  value,
  accept = ".pdf,.doc,.docx",
  backgroundColor = "#475D7B",
  textColor = "white",
}) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleClick = () => {
    inputRef.current?.click();
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      onChange(event.target.files[0]);
    }
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    if (event.dataTransfer.files && event.dataTransfer.files[0]) {
      onChange(event.dataTransfer.files[0]);
    }
  };

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  };

  return (
    <div
      className={styles.container}
      onClick={handleClick}
      onDrop={handleDrop}
      onDragOver={handleDragOver}
      style={{ backgroundColor, color: textColor }}
    >
      <input
        ref={inputRef}
        type="file"
        accept={accept}
        onChange={handleChange}
        className={styles.input}
      />
      <div className={styles.content}>
        <div className={styles.iconContainer}>
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M14 2H6C5.46957 2 4.96086 2.21071 4.58579 2.58579C4.21071 2.96086 4 3.46957 4 4V20C4 20.5304 4.21071 21.0391 4.58579 21.4142C4.96086 21.7893 5.46957 22 6 22H18C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20V8L14 2Z"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M14 2V8H20"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M12 18V12"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M9 15H15"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
        <div className={styles.textContainer}>
          <p className={styles.mainText}>Drop Files here or Browse</p>
          <p className={styles.subText}>Accepted file format: PDF</p>
        </div>
      </div>
      {value && (
        <div className={styles.fileName}>Selected file: {value.name}</div>
      )}
    </div>
  );
};

export default FileUpload;
