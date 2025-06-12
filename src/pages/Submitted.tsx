import heart from "../assets/heart.svg";
import Text from "../components/Text/Text";
import grassSVG from "../assets/grass.svg";
import appleSVG from "../assets/apple.svg";
import tree1SVG from "../assets/tree1.svg";
import tree2SVG from "../assets/tree2.svg";
import signSVG from "../assets/sign.svg";
import shrubSVG from "../assets/shrub.svg";
import shrub2SVG from "../assets/shrub2.svg";
import cloudSVG from "../assets/cloudsLaptop.svg";
import cloudPhoneSVG from "../assets/cloudsPhone.svg";

import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();
  const GRASSCOUNT = 40;

  return (
    <div className="sm:gap-0 gap-4 overflow-hidden p-8 bg-linear-to-b from-[#ACDCFD] via-[#B3E9FC] to-[#B9F2FC] h-[100vh] w-full flex flex-col justify-center items-center text-center">
      <div className="overflow-hidden absolute bottom-0 left-[60%] sm:flex hidden">
        {Array.from({ length: 3 }).map((_, index) => (
          <img
            key={index}
            src={grassSVG}
            alt="Grass"
            className="sm:h-[118px] sm:w-[77px] h-[46px] mb-[77px] w-[30px]"
          />
        ))}
      </div>
      <img
        src={cloudSVG}
        alt="Cloud"
        className="absolute w-full top-0 left-0 hidden sm:block"
      />

      <img
        src={cloudPhoneSVG}
        alt="Cloud"
        className="absolute w-full top-[80px] left-0 sm:hidden block"
      />

      <div className="overflow-hidden absolute bottom-0 left-0 w-full flex justify-between items-end">
        {Array.from({ length: GRASSCOUNT }).map((_, index) => (
          <img
            key={index}
            src={grassSVG}
            alt="Grass"
            className="sm:h-[118px] sm:w-[78px] h-[46px] w-[30px]"
          />
        ))}
      </div>

      <img
        src={appleSVG}
        alt="Apple"
        className="absolute sm:h-[70px] sm:w-[70px] sm:bottom-[170px] left-[calc(60%+20px)] w-[35px] h-[35px] bottom-[42px] animate-bounce-custom"
      />

      <div className="w-full overflow-hidden absolute top-0 left-0 h-full sm:flex hidden">
        <img
          src={signSVG}
          alt="Sign"
          className="absolute h-[96px] w-[100px] bottom-[170px] left-[calc(60%+130px)]"
        />

        <img
          src={shrubSVG}
          alt="Shrub"
          className="absolute h-[90px] w-[130px] bottom-[90px] left-[calc(60%+200px)]"
        />

        <img
          src={shrub2SVG}
          alt="Two Shrubs"
          className="absolute h-[90px] w-[200px] bottom-[90px] left-[calc(60%-150px)]"
        />
        <img
          src={shrubSVG}
          alt="Shrub"
          className="absolute h-[90px] w-[130px] bottom-[90px] right-[-30px]"
        />

        <img
          src={tree1SVG}
          alt="Pine tree"
          className="absolute h-[300px] w-[300px] bottom-[80px] left-[-30px]"
        />

        <img
          src={shrub2SVG}
          alt="Two Shrubs"
          className="absolute h-[90px] w-[200px] bottom-[90px] left-[10%]"
        />

        <img
          src={tree2SVG}
          alt="Tree"
          className="absolute h-[300px] w-[300px] bottom-[80px] right-[20px]"
        />

        <img
          src={tree2SVG}
          alt="Tree"
          className="absolute h-[300px] w-[300px] bottom-[80px] left-[calc(10%+130px)]"
        />
      </div>
      <div className="flex flex-col items-center justify-center z-10 w-full max-w-[850px] mx-auto px-4">
        <img src={heart} alt="Heart" className="w-16 mb-8" />

        <Text
          textType="heading-lg"
          textFont="rubik"
          textColor="primary"
          className="z-[100] text-center"
        >
          Thanks for applying!
        </Text>
        <Text
          textType="heading-sm"
          textWeight="regular"
          textFont="rubik"
          textColor="secondary"
          className="text-center mt-4"
        >
          Application submitted successfully
        </Text>
      </div>
    </div>
  );
}
