import Text from "../components/Text/Text";
import Button from "../components/Button/Button";
import frameSVG from "../assets/frame.svg";
import signSVG from "../assets/frame-sign.svg";
import { useState, useRef, useEffect } from "react";
import ProgressBar from "../components/ProgressBar/ProgressBar";
import cupPNG from "../assets/cup.png";
import duckPNG from "../assets/duck.png";
import tissuePNG from "../assets/tissue.png";
import tree2SVG from "../assets/tree2.svg";
import shrub_flowerSVG from "../assets/bush_flower.svg";
import birdSVG from "../assets/bird.svg";
import { useNavigate } from "react-router-dom";
import { PLAYER_IMAGES } from "../constants/images";
import { useApplicationContext } from "../contexts/ApplicationContext";
import appleSVG from "../assets/apple.svg";
import { useSearchParams } from "react-router-dom";
import type { FormData } from "../contexts/ApplicationContext";

const COLORS = [
  "#F2D4B5",
  "#C98266",
  "#6E3C3C",
  "#79C9D2",
  "#E1E6E7",
  "#BCBBB5"
];
const ITEMS = [cupPNG, tissuePNG, duckPNG];
const ENCOURAGEMENTS = [
  "LOOKIN' FINE!",
  "GOOD CHOICE!",
  "NICE PICK!",
  "LOVE IT!"
];
const STATBONUS = ["NONE", "+3 ENERGY", "+3 MORALE", "+3 VIBES"];

function ColorPicker({
  selectedSkin,
  setSelectedSkin,
  setEncouragement
}: {
  selectedSkin: number;
  setSelectedSkin: (skin: number) => void;
  setEncouragement: React.Dispatch<React.SetStateAction<number>>;
}) {
  return (
    <div className="flex gap-2 flex-wrap mb-6 w-full">
      {COLORS.map((color, index) => (
        <div
          key={index}
          className="sm:w-[50px] h-[50px] w-[31%] sm:h-[48px] border-[3px] rounded-[5px] sm:rounded-[10px] cursor-pointer hover:scale-105 transition-all duration-300"
          style={{
            backgroundColor: color,
            borderColor: selectedSkin === index ? "#00887E" : "#919DAF"
          }}
          onClick={() => {
            if (selectedSkin !== index) {
              setSelectedSkin(index);
              setEncouragement((prev) => (prev + 1) % ENCOURAGEMENTS.length);
            }
          }}
        />
      ))}
    </div>
  );
}

function ItemPicker({
  selectedItem,
  setSelectedItem
}: {
  selectedItem: number;
  setSelectedItem: (item: number) => void;
}) {
  return (
    <div className="flex flex-wrap justify-start gap-2 w-full mb-6">
      {ITEMS.map((item, index) => (
        <div
          key={index}
          className="border-[3px] bg-[#F3FAE0] rounded-[5px] sm:rounded-[10px] flex items-center justify-center w-[31%] sm:w-[70px] h-[70px] hover:scale-105 transition-all duration-300"
          style={{
            borderColor: selectedItem === index + 1 ? "#00887E" : "#919DAF"
          }}
          onClick={() => setSelectedItem(index + 1)}
        >
          <img src={item} alt="Item" className="h-[62px] w-[62px]" />
        </div>
      ))}
    </div>
  );
}

function SignDisplay({
  page,
  encouragement,
  selectedItem
}: {
  page: number;
  encouragement: number;
  selectedItem: number;
}) {
  return (
    <div className="relative sm:block hidden mx-auto">
      <img src={signSVG} alt="Sign" className="sm:h-[70px] sm:w-[180px]" />
      {page === 1 ? (
        <div className="absolute left-[25px] top-[15px] text-center w-3/4 font--jersey-10-regular text-[24px] text-[#252C37]">
          {ENCOURAGEMENTS[encouragement]}
        </div>
      ) : (
        <div className="absolute left-[25px] top-[10px] text-center w-3/4 font--jersey-10-regular text-[24px] leading-[24px]">
          <div className="text-[#252C37]">STAT BONUS:</div>
          <div className="text-[#08566B]">{STATBONUS[selectedItem]}</div>
        </div>
      )}
    </div>
  );
}

export default function PlayerSelect() {
  const navigate = useNavigate();
  const {
    selectedItem,
    selectedSkin,
    setSelectedItem,
    setSelectedSkin,
    formData,
    setFormData
  } = useApplicationContext();
  const [encouragement, setEncouragement] = useState(0);
  const [searchParams, setSearchParams] = useSearchParams();
  const page = parseInt(searchParams.get("page") || "1");

  const formDataRef = useRef<FormData>(formData);

  useEffect(() => {
    formDataRef.current = formData;
  }, [formData]);

  useEffect(() => {
    const currentFormData = formDataRef.current;
    let shouldUpdateFormData = false;
    if (
      currentFormData.selectedItem !== selectedItem ||
      currentFormData.selectedSkin !== selectedSkin
    ) {
      shouldUpdateFormData = true;
    }

    if (shouldUpdateFormData) {
      setFormData({
        ...currentFormData,
        selectedItem,
        selectedSkin
      });
    }
  }, [selectedItem, selectedSkin, setFormData]);

  useEffect(() => {
    if (selectedSkin === undefined) {
      setSelectedSkin(-1);
    }
  }, [selectedSkin, setSelectedSkin]);

  return (
    <div className="overflow-hidden bg-linear-to-b from-[#ACDCFD] via-[#B3E9FC] to-[#B9F2FC] h-[100vh] w-full flex flex-col justify-center items-center p-8">
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
        alt="Bird"
        className="sm:block hidden absolute h-[90px] w-[200px] bottom-[90px] left-[300px]"
      />
      <img
        src={shrub_flowerSVG}
        alt="Shrubs"
        className="sm:block hidden absolute h-[90px] w-[200px] bottom-[90px] right-[150px]"
      />
      <img
        src={appleSVG}
        alt="Apple"
        className="absolute sm:h-[70px] sm:w-[70px] sm:bottom-[90px] sm:right-[55px] right-[70px] w-[35px] h-[35px] bottom-[38px]"
      />

      <div className="w-full h-full flex items-center justify-center px-4 py-8 overflow-hidden z-10">
        <div className="flex flex-col-reverse sm:flex-row items-center sm:items-center justify-center gap-12 sm:gap-[150px] w-full max-w-[850px] mx-auto">
          <div className="flex flex-col items-center sm:items-start w-full sm:w-[430px] gap-4">
            <Text
              textType="heading-lg"
              className="w-full text-center sm:text-left"
              textFont="rubik"
              textColor="primary"
            >
              {page === 1 ? "Select your hacker!" : "Select your item!"}
            </Text>

            {page === 2 ? (
              <ItemPicker
                selectedItem={selectedItem}
                setSelectedItem={setSelectedItem}
              />
            ) : (
              <ColorPicker
                selectedSkin={selectedSkin}
                setSelectedSkin={setSelectedSkin}
                setEncouragement={setEncouragement}
              />
            )}

            <div className="flex flex-col-reverse sm:flex-row justify-center sm:justify-end w-full gap-3">
              {page === 2 && (
                <Button
                  variant="back"
                  onClick={() => setSearchParams({ page: `${page - 1}` })}
                  className="w-full sm:w-auto"
                />
              )}
              <Button
                onClick={() => {
                  if (page === 1) setSearchParams({ page: `${page + 1}` });
                  else navigate("/apply/about?page=1");
                }}
                variant="next"
                className="w-full sm:w-auto"
                disabled={page === 1 ? selectedSkin === -1 : selectedItem === 0}
              />
            </div>
            <div className="flex justify-end sm:justify-end w-full">
              <ProgressBar numSteps={2} currPage={page} />
            </div>
          </div>

          <div className="flex flex-col items-center sm:items-start gap-4">
            <div className="relative">
              <img
                src={frameSVG}
                alt="Character Frame"
                className="!h-[290px] !w-[290px] !sm:h-[420px] !sm:w-[420px]"
              />
              <img
                src={PLAYER_IMAGES[selectedSkin][selectedItem]}
                alt="Character Select"
                className={`object-cover !h-[280px] !w-[270px] !sm:h-[362px] !sm:w-[362px] absolute ${
                  selectedSkin === 4 || selectedSkin === 5
                    ? "sm:top-[-10px] sm:left-12 left-4 top-[-15px]"
                    : "sm:top-1 sm:left-12 left-4 top-[-10px]"
                }`}
              />
            </div>
            <SignDisplay
              page={page}
              encouragement={encouragement}
              selectedItem={selectedItem}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
