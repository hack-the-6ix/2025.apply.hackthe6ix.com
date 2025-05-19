import React from "react";
import Text from "../Text/Text";

interface ProgressBarProps {
  numSteps: number;
  currPage: number;
  className?: string;
}

const ProgressBar: React.FC<ProgressBarProps> = ({
  numSteps = 2,
  currPage = 1,
  className = "",
  ...props
}) => {
  const percentage = Math.min((currPage / numSteps) * 100, 100);

  return (
    <div
      {...props}
      className={`flex flex-row gap-3 items-center justify-center ${className}`}
    >
      <Text
        textType="paragraph-sm"
        textWeight="bold"
        textFont="rubik"
        textColor="primary"
      >
        {currPage}/{numSteps}
      </Text>

      <div className="w-[120px] h-[15px] bg-white rounded-full relative overflow-hidden">
        <div
          className="absolute top-0 left-0 h-full bg-[#00887E] rounded-full transition-all duration-500 ease-in-out"
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
};

export default ProgressBar;
