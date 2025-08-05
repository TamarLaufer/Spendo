import { Text, View } from 'react-native';
import { useExpenseWizard } from '../../zustandState/useExpenseWizard';

type EndProcessStepType = {};

const EndProcessStep = ({}: EndProcessStepType) => {
  const subCategoryId = useExpenseWizard(state => state.subCategoryId);
  console.log(subCategoryId, 'subCategoryId');

  return (
    <View>
      <Text>ההוצאה נשמרה בהצלחה!</Text>
    </View>
  );
};

export default EndProcessStep;
