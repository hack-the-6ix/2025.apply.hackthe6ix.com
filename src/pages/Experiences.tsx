import Input from '../components/Input/Input';
import Text from '../components/Text/Text';

export default function Experiences() {
  return (
    <>
    <div className="sm:gap-0 gap-4 overflow-hidden p-8 bg-linear-to-b from-[#2C4374] to-[#062938] h-[100vh] w-full flex flex-col justify-center items-center text-center">
      <div className="absolute top-[244px] left-[158px] w-full max-w-[850px] h-[246px] flex flex-col gap-[22px] px-4 sm:px-6 md:px-0">
        <div className="h-[72px] flex items-center gap-[10px] p-[10px] rounded">
          <Text textType="heading-lg" textFont="rubik" textColor="white">
            Your School (Most Recently Attended)*
          </Text>

        </div>
        <div className="h-[44px]">
          <Input placeholder='Something'></Input>

        </div>
      </div>
    </div>
    </>
  );
}
  