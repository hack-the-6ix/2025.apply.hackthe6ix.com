import Text from "../components/Text/Text";

export default function Home() {
  return (
    <div className="p-8 bg-linear-to-b from-[#ACDCFD] to-[#B9F2FC] h-[100vh] w-full flex flex-col justify-center items-center gap-4">
      <Text textType="heading-lg" textFont="rubik" textColor="primary">
        Hack the 6ix 2025
      </Text>
      <Text textType="heading-lg" textFont="rubik" textColor="black">
        Hacker Application
      </Text>
      <Text
        textType="heading-sm"
        textWeight="regular"
        textFont="rubik"
        textColor="secondary"
      >
        Application due:
      </Text>
      <div className="sm:w-auto w-full bg-[#00887E] border-black border-4 py-4 px-8 flex justify-center">
        <Text
          textType="heading-sm"
          textWeight="regular"
          textFont="rubik"
          textColor="white"
        >
          START
        </Text>
      </div>
    </div>
  );
}
