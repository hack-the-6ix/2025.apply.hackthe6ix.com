import Text from "../components/Text/Text";

import grassSVG from "../assets/grass.svg";

export default function Home() {
  const GRASSCOUNT = 40;

  return (
    <div className="overflow-hidden p-8 bg-linear-to-b from-[#ACDCFD] via-[#B3E9FC] to-[#B9F2FC] h-[100vh] w-full flex flex-col justify-center items-center text-center">
      <Text textType="heading-lg" textFont="rubik" textColor="primary">
        Hack the 6ix 2025
      </Text>
      <div className="font--jersey-10-regular sm:text-[80px] text-[68px] color-[#252C37] sm:leading-20 leading-15">
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
      <div className="hover:bg-[#20b7ac] relative sm:w-[180px] w-full bg-[#00887E] border-black border-[5px] h-[80px] flex justify-center items-center mt-[30px]">
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
      </div>

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
    </div>
  );
}
