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
        className="absolute w-full top-0 left-0 hidden sm:block z-[0]"
      />

      <img
        src={cloudPhoneSVG}
        alt="Cloud"
        className="absolute w-full top-[80px] left-0 sm:hidden block z-[0]"
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
        className="absolute sm:h-[70px] sm:w-[70px] sm:bottom-[170px] left-[calc(60%+20px)] w-[35px] h-[35px] bottom-[42px]  animate-bounce-custom"
      />

      <div className="w-full overflow-hidden absolute top-0 left-0 h-full sm:flex hidden">
        <img
          src={signSVG}
          alt="Sign"
          className="absolute h-[96px] w-[100px] bottom-[170px] left-[calc(60%+130px)] "
        />

        <img
          src={shrubSVG}
          alt="Shrub"
          className="absolute h-[90px] w-[130px] bottom-[90px] left-[calc(60%+200px)] "
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

      <Text textType="heading-lg" textFont="rubik" textColor="primary" className="z-[100]">
        Hack the 6ix 2025
      </Text>
      <div className="font--jersey-10-regular sm:text-[80px] text-[68px] color-[#252C37] sm:leading-20 leading-13">
        HACKER APPLICATION
      </div>
      <Text
        textType="heading-md"
        textWeight="regular"
        textFont="rubik"
        textColor="secondary"
      >
        Application due:
      </Text>
      <button
        className="hover:bg-[#20b7ac] relative sm:w-[180px] w-full bg-[#00887E] border-black sm:border-[5px] border-[3px] sm:h-[80px] h-[50px] flex justify-center items-center sm:mt-[30px] mt-[140px]"
        onClick={() => navigate("/apply?section=player")}
      >
        <Text
          textType="heading-lg"
          textWeight="regular"
          textFont="rubik"
          textColor="white"
        >
          START
        </Text>
        <div className="absolute w-[6px] h-[6px] bg-[#B9F2FC] top-[-6px] left-[-6px]"></div>
        <div className="absolute w-[6px] h-[6px] bg-[#B9F2FC] top-[-6px] right-[-6px]"></div>
        <div className="absolute w-[6px] h-[6px] bg-[#B9F2FC] bottom-[-6px] left-[-6px]"></div>
        <div className="absolute w-[6px] h-[6px] bg-[#B9F2FC] bottom-[-6px] right-[-6px]"></div>
      </button>
    </div>
  );
}
