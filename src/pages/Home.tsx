import Text from "../components/Text/Text";

export default function Home() {
  return (
    <div className="p-8 bg-linear-to-b from-[#ACDCFD] via-[#B3E9FC] to-[#B9F2FC] h-[100vh] w-full flex flex-col justify-center items-center text-center">
      <Text textType="heading-lg" textFont="rubik" textColor="primary">
        Hack the 6ix 2025
      </Text>
      <div className="font-400 text-[80px] color-[#252C37]">
        Hacker Application
      </div>
      <Text
        textType="heading-md"
        textWeight="regular"
        textFont="rubik"
        textColor="secondary"
      >
        Application due:
      </Text>
      <div className="hover:bg-[#20b7ac] relative sm:w-[180px] w-full bg-[#00887E] border-black border-[5px] h-[80px] flex justify-center items-center mt-[40px]">
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
    </div>
  );
}
