import { useState } from "react";
import Text from "../Text/Text";

interface CheckboxProps {
  label: string;
  onChange?: (checked: boolean) => void;
  defaultChecked?: boolean;
}

export default function Checkbox({ label, onChange, defaultChecked = false }: CheckboxProps) {
  const [isChecked, setIsChecked] = useState(defaultChecked);

  const handleClick = () => {
    const newValue = !isChecked;
    setIsChecked(newValue);
    onChange?.(newValue);
  };

  return (
    <div className="flex items-center gap-2 cursor-pointer" onClick={handleClick}>
      <div 
        className={`w-4 h-4 border rounded flex items-center justify-center transition-colors group ${
          isChecked ? 'bg-[#00887E] border-[#00887E]' : 'border-[#00887E] hover:bg-[#00887E]'
        }`}
      >
        {(isChecked || !isChecked) && (
          <svg 
            width="10" 
            height="8" 
            viewBox="0 0 10 8" 
            fill="none" 
            xmlns="http://www.w3.org/2000/svg"
            className={`transition-opacity ${isChecked ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`}
          >
            <path 
              d="M1 4L4 7L9 1" 
              stroke="#FFFFFFB2" 
              strokeWidth="1.5" 
              strokeLinecap="round" 
              strokeLinejoin="round"
            />
          </svg>
        )}
      </div>
      <Text textType="paragraph-sm" textFont="rubik" textColor="primary">
        {label}
      </Text>
    </div>
  );
} 