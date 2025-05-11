import Input from '../components/Input/Input';
import Text from '../components/Text/Text';

export default function Survey() {
  return (
    <div>
      <Text textType="heading-lg" textFont="rubik" textColor="primary">
        Please choose 3 workshops
      </Text>
      <Input placeholder="survey" />
    </div>
  );
}