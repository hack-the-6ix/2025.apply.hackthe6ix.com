import Input from '../components/Input/Input';
import Text from '../components/Text/Text';

export default function Survey() {
  return (
    <div className="sm:gap-0 gap-4 overflow-hidden p-8 bg-linear-to-b from-[#21293C] via-[#60639D] to-[#DF6369]  h-[100vh] w-full flex flex-col justify-center items-center text-center">
      <div>
        <Text textType="heading-lg" textFont="rubik" textColor="white">
          Please choose 3 workshops
        </Text>
        <Input placeholder="long answer" />
      </div>
    /</div>
  );
}