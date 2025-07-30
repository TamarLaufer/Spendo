import { Button } from 'react-native';
import { Text, View } from 'react-native';

type EndProcessStepType = {
  onSubmit: () => void;
};

const EndProcessStep = ({ onSubmit }: EndProcessStepType) => (
  <View>
    <Text>ההוצאה נשמרה בהצלחה!</Text>
    <Button title="תודה, סיימתי" onPress={onSubmit} />
  </View>
);

export default EndProcessStep;
