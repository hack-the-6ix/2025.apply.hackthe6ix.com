import Text from "../components/Text/Text";
import Button from "../components/Button/Button";
import frameSVG from "../assets/frame.svg";
import signSVG from "../assets/frame-sign.svg";
import { useState } from "react";

export default function PlayerSelect() {
  const COLORS = [
    "#F2D4B5",
    "#C98266",
    "#6E3C3C",
    "#79C9D2",
    "#E1E6E7",
    "#BCBBB5",
  ];

  const ENCOURAGEMENTS = [
    "Lookin' Fine!",
    "Good Choice!",
    "Nice Pick!",
    "Love the Fit!",
  ];

  const [encouragement, setEncouragement] = useState(0);
  const [skinChoice, setSkinChoice] = useState(0);

  return (
    <div className="w-full h-full flex items-center justify-center px-4 py-8 overflow-hidden">
      <div className="flex flex-col sm:flex-row items-center sm:items-start justify-center gap-12 sm:gap-[150px] w-full max-w-[1200px]">
        <div className="flex flex-col items-center sm:items-end w-full sm:w-[430px] gap-4">
          <Text textType="heading-lg" textFont="rubik" textColor="primary">
            Select your hacker!
          </Text>
          <div className="flex gap-2 flex-wrap justify-center sm:justify-end mb-6">
            {COLORS.map((color, index) => (
              <div
                key={index}
                className="w-[50px] h-[50px] border-[3px]  rounded-[10px]"
                style={{
                  backgroundColor: color,
                  borderColor: skinChoice == index ? "#00887E" : "#919DAF",
                }}
                onClick={() => {
                  setSkinChoice(index);
                  setEncouragement(
                    (prev) => (prev + 1) % ENCOURAGEMENTS.length
                  );
                }}
              />
            ))}
          </div>
          <Button />
        </div>

        <div className="flex flex-col items-start gap-4">
          <img
            src={frameSVG}
            alt="Character Frame"
            className="h-[290px] w-[290px] sm:h-[420px] sm:w-[420px]"
          />
          <div className="relative sm:block hidden">
            <img
              src={signSVG}
              alt="Sign"
              className="sm:h-[70px] sm:w-[180px]"
            />
            <div className="absolute left-[25px] top-[5px] font--jersey-10-regular text-[24px] color-[#252C37]">
              {ENCOURAGEMENTS[encouragement]}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
