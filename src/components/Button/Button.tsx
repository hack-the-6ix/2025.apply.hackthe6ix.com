import React from "react";
import { FaArrowRight } from "react-icons/fa6";
import { FaArrowLeft } from "react-icons/fa6";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "next" | "back";
  children?: React.ReactNode;
  darkMode?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  variant = "next",
  children,
  className = "",
  darkMode = false,
  ...props
}) => {
  const baseStyles = `disabled:bg-gray-400 disabled:text-gray-100 disabled:cursor-not-allowed disabled:border-0 rounded-md px-4 py-2 font-semibold transition sm:w-[110px] h-[44px] w-full border flex items-center justify-center cursor-pointer`;
  const variantStyles =
    variant === "back"
      ? `bg-transparent text-[#00887E] hover:bg-[#a0e6fa]  ${
          darkMode ? "border-white text-white" : "border-[#00887E]"
        }`
      : `bg-[#00887E] border-transparent text-white hover:bg-[#007a71] ${
          darkMode ? "text-white hover:border-white" : "hover:border-[#00887E]"
        }`;

  if (children) {
    return (
      <button
        className={`${baseStyles} ${variantStyles} ${className}`}
        {...props}
      >
        {children}
      </button>
    );
  }

  return (
    <button
      className={`${baseStyles} ${variantStyles} ${className}`}
      {...props}
    >
      {variant == "next" ? (
        <span className="flex flex-row gap-3 items-center justify-center">
          <FaArrowRight className="text-[12px]" /> Next
        </span>
      ) : (
        <span className="flex flex-row gap-3 items-center justify-center">
          <FaArrowLeft className="text-[12px]" /> Back
        </span>
      )}
    </button>
  );
};

export default Button;
