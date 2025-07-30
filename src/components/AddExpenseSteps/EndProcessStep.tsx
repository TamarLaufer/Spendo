import { Button } from 'react-native';
import { Text, View } from 'react-native';

type EndProcessStepType = {
  onBack: () => void;
  onSubmit: () => void;
};

const EndProcessStep = ({ onBack, onSubmit }: EndProcessStepType) => (
  <View>
    <Text>ההוצאה נשמרה בהצלחה!</Text>
    <Button title="חזור" onPress={onBack} />
    <Button title="תודה, סיימתי" onPress={onSubmit} />
  </View>
);

export default EndProcessStep;
