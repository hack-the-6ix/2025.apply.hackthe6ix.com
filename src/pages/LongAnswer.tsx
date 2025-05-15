import Input from '../components/Input/Input';
import Text from '../components/Text/Text';

export default function LongAnswer() {
  return (
    <div className="sm:gap-0 gap-4 overflow-hidden p-8 bg-linear-to-b from-[#21293C] to-[#06162F] h-[100vh] w-full flex flex-col justify-center items-center text-center">
      <div>
        <Text textType="heading-lg" textFont="rubik" textColor="white">
          What would you like to accomplish?
        </Text>
        <Input placeholder="long answer" />
      </div>
    </div>
  );
}
  