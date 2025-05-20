import Text from "../components/Text/Text";
import Button from "../components/Button/Button";
import frameSVG from "../assets/frame.svg";
import signSVG from "../assets/frame-sign.svg";
import { useState } from "react";
import ProgressBar from "../components/ProgressBar/ProgressBar";
import cupPNG from "../assets/cup.png";
import duckPNG from "../assets/duck.png";
import tissuePNG from "../assets/tissue.png";
import tree2SVG from "../assets/tree2.svg";
import shrub_flowerSVG from "../assets/bush_flower.svg";
import birdSVG from "../assets/bird.svg";
import { useContext } from "react";
import { Context } from "../components/ContextProvider";
import { useNavigate } from "react-router-dom";

import A0 from "../assets/players/00.png";
import A1 from "../assets/players/01.png";
import A2 from "../assets/players/02.png";
import A3 from "../assets/players/03.png";

import B0 from "../assets/players/10.png";
import B1 from "../assets/players/11.png";
import B2 from "../assets/players/12.png";
import B3 from "../assets/players/13.png";

import C0 from "../assets/players/20.png";
import C1 from "../assets/players/21.png";
import C2 from "../assets/players/22.png";
import C3 from "../assets/players/23.png";

import D0 from "../assets/players/30.png";
import D1 from "../assets/players/31.png";
import D2 from "../assets/players/32.png";
import D3 from "../assets/players/33.png";

import E0 from "../assets/players/40.png";
import E1 from "../assets/players/41.png";
import E2 from "../assets/players/42.png";
import E3 from "../assets/players/43.png";

import F0 from "../assets/players/50.png";
import F1 from "../assets/players/51.png";
import F2 from "../assets/players/52.png";
import F3 from "../assets/players/53.png";



const COLORS = [
  "#F2D4B5",
  "#C98266",
  "#6E3C3C",
  "#79C9D2",
  "#E1E6E7",
  "#BCBBB5",
];
const ITEMS = [cupPNG, tissuePNG, duckPNG];
const ENCOURAGEMENTS = [
  "LOOKIN' FINE!",
  "GOOD CHOICE!",
  "NICE PICK!",
  "LOVE IT!",
];
const STATBONUS = ["NONE", "+3 ENERGY", "+3 MORALE", "+3 VIBES"];

const PLAYER_IMAGES = [
  [A0, A1, A2, A3],  // Player 0 images
  [B0, B1, B2, B3],  // Player 1 images
  [C0, C1, C2, C3],  // Player 2 images
  [D0, D1, D2, D3],  // Player 3 images
  [E0, E1, E2, E3],  // Player 4 images
  [F0, F1, F2, F3],  

];

export default function PlayerSelect() {
  const navigate = useNavigate();
  const { setCompletedSection, completedSection } = useContext(Context);

  const [encouragement, setEncouragement] = useState(0);
  const [skinChoice, setSkinChoice] = useState(0);
  const [itemChoice, setItemChoice] = useState(0);
  const [page, setPage] = useState(1);

  return (
    <div className="overflow-hidden bg-linear-to-b from-[#ACDCFD] via-[#B3E9FC] to-[#B9F2FC] h-[100vh] w-full">
      <img
        src={tree2SVG}
        alt="Tree"
        className="sm:block hidden absolute h-[300px] w-[300px] bottom-[80px] left-[25px]"
      />

      <img
        src={shrub_flowerSVG}
        alt="Shrubs"
        className="sm:block hidden absolute h-[90px] w-[200px] bottom-[90px] left-[450px]"
      />

      <img
        src={birdSVG}
        alt="Shrubs"
        className="sm:block hidden absolute h-[90px] w-[200px] bottom-[90px] left-[300px]"
      />

      <img
        src={shrub_flowerSVG}
        alt="Shrubs"
        className="sm:block hidden absolute h-[90px] w-[200px] bottom-[90px] right-[150px]"
      />
      <div className="w-full h-full flex items-center justify-center px-4 py-8 overflow-hidden">
        <div className="flex flex-col sm:flex-row items-center sm:items-start justify-center gap-12 sm:gap-[150px] w-full max-w-[1200px]">
          <div className="flex-col items-center sm:items-end w-full sm:w-[430px] gap-4 sm:flex hidden">
            <Text textType="heading-lg" textFont="rubik" textColor="primary">
              {page === 1 ? "Select your hacker!" : "Select your item!"}
            </Text>
            {page === 2 ? (
              <div className="flex gap-2 flex-wrap justify-center sm:justify-end mb-6">
                {ITEMS.map((item, index) => (
                  <div
                    key={index}
                    className="w-[70px] h-[70px] border-[3px] bg-[#F3FAE0] rounded-[10px] flex items-center justify-center"
                    style={{
                      borderColor: itemChoice == index+1 ? "#00887E" : "#919DAF",
                    }}
                    onClick={() => {
                      setItemChoice(index+1);
                    }}
                  >
                    <img
                      key={index}
                      src={item}
                      alt="Character Item"
                      className="sm:h-[70px] sm:w-[70px] h-[46px] w-[30px]"
                    />
                  </div>
                ))}
              </div>
            ) : (
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
            )}

            <div className="flex flex-row gap-3">
              {page == 2 && (
                <Button variant="back" onClick={() => setPage(page - 1)} />
              )}
              <Button
                onClick={() => {
                  if (page == 1) {
                    setPage(page + 1);
                  } else {
                    const updateCompleted = completedSection.map((val, i) =>
                      i === 0 ? true : val
                    );
                    setCompletedSection(updateCompleted);
                    navigate("/apply?section=about");
                  }
                }}
              />
            </div>
            <ProgressBar numSteps={2} currPage={page} />
          </div>

          <div className="block sm:hidden">
            <Text textType="display" textFont="rubik" textColor="primary">
              {page === 1 ? "Select your hacker!" : "Select your item!"}
            </Text>
          </div>

          <div className="flex flex-col items-start gap-4">
            <div className="relative">
            <img
              src={frameSVG}
              alt="Character Frame"
              className="h-[290px] w-[290px] sm:h-[420px] sm:w-[420px]"
            />
                        <img
              src={PLAYER_IMAGES[skinChoice][itemChoice]}
              alt="Character Select"
              className="h-[280px] w-[270px] sm:h-[362px] sm:w-[362px] sm:top-3 sm:left-8 left-2 top-[-10px] absolute"
            />
            </div>
            <div className="relative sm:block hidden">
              <img
                src={signSVG}
                alt="Sign"
                className="sm:h-[70px] sm:w-[180px]"
              />
              {page == 1 ? (
                <div className="absolute left-[25px] top-[5px] font--jersey-10-regular text-[24px] color-[#252C37]">
                  {ENCOURAGEMENTS[encouragement]}
                </div>
              ) : (
                <div className="absolute left-[25px] top-[10px] font--jersey-10-regular text-[24px] leading-[24px]">
                  <div className="text-[#252C37]">STAT BONUS:</div>
                  <div className="text-[#08566B]">{STATBONUS[itemChoice]}</div>
                </div>
              )}
            </div>
          </div>

          <div className="flex flex-col items-center w-full gap-4 sm:hidden block mt-2">
            {page === 2 ? (
              <div className="flex flex-wrap w-full justify-between sm:justify-end">
                {ITEMS.map((item, index) => (
                  <div
                    key={index}
                    className="w-[31%] h-[70px] border-[3px] bg-[#F3FAE0] rounded-[5px] flex items-center justify-center"
                    style={{
                      borderColor: itemChoice == index+1 ? "#00887E" : "#919DAF",
                    }}
                    onClick={() => {
                      setItemChoice(index+1);
                    }}
                  >
                    <img
                      key={index}
                      src={item}
                      alt="Character Item"
                      className="h-[62px] w-[62px]"
                    />
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex gap-2 flex-wrap justify-center sm:justify-end w-full">
                {COLORS.map((color, index) => (
                  <div
                    key={index}
                    className="w-[31%] h-[48px] border-[3px] rounded-[5px]"
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
            )}
            <div className="flex flex-col gap-3 w-full items-end mt-4">
              <Button
                onClick={() => {
                  if (page == 1) {
                    setPage(page + 1);
                  } else {
                    const updateCompleted = completedSection.map((val, i) =>
                      i === 0 ? true : val
                    );
                    setCompletedSection(updateCompleted);
                    navigate("/apply?section=about");
                  }
                }}
              />
              {page == 2 && (
                <Button variant="back" onClick={() => setPage(page - 1)} />
              )}
              <ProgressBar numSteps={2} currPage={page} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
