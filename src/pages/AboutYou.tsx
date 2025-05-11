import Input from '../components/Input/Input';
import Text from '../components/Text/Text';

export default function AboutYou() {
  return (
    <div>
      <Text textType="heading-lg" textFont="rubik" textColor="primary">
        What's your email?
      </Text>
      <Input placeholder="johndoeuniversity.com" />
    </div>
  );
}