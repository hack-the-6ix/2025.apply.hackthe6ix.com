import Input from '../components/Input/Input';
import Text from '../components/Text/Text';

export default function LongAnswer() {
  return (
    <div>
      <Text textType="heading-lg" textFont="rubik" textColor="primary">
        What would you like to accomplish?
      </Text>
      <Input placeholder="long answer" />
    </div>
  );
}
  