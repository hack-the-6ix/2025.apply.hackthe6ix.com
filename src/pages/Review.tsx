import Input from '../components/Input/Input';
import Text from '../components/Text/Text';

export default function Review() {
  return (
    <div className="sm:gap-0 gap-4 overflow-hidden p-8 bg-[linear-gradient(to_bottom,_#B1E1F9,_#E5DCD9,_#FCD2B3,_#F5AB42)] h-[100vh] w-full flex flex-col justify-center items-center text-center">
      <div>
        <Text textType="heading-lg" textFont="rubik" textColor="primary">
          Review app before submitting
        </Text>
        <Input placeholder="long answer" />
      </div>
    </div>
  );
}