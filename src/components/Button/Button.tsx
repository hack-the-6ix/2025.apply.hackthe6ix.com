import React from "react";
import { FaArrowRight } from "react-icons/fa6";
import { FaArrowLeft } from "react-icons/fa6";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "next" | "back";
  children?: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({
  variant = "next",
  children,
  className = "",
  ...props
}) => {
  const baseStyles = "rounded-md px-4 py-2 font-semibold transition sm:w-[110px] h-[44px] w-full border border-[#00887E] flex items-center justify-center";
  const variantStyles =
    variant === "back"
      ? "bg-transparent text-[#00887E] hover:bg-[#00887E] hover:text-white"
      : "bg-[#00887E] text-white hover:bg-transparent hover:text-[#00887E]";

      if (children){
        return (
            <button className={`${baseStyles} ${variantStyles} ${className}`} {...props}>
              {children}
            </button>
          );
      }

  return (
    <button className={`${baseStyles} ${variantStyles} ${className}`} {...props}>
      {variant == "next" ? <span className="flex flex-row gap-3 items-center justify-center"><FaArrowRight className="text-[12px]"/> Next</span> : <span className="flex flex-row gap-3 items-center justify-center"><FaArrowLeft className="text-[12px]"/> Back</span>}
    </button>
  );
};

export default Button;
