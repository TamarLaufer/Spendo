import { StyleSheet, Text, View } from 'react-native';
import { useExpenseWizard } from '../../zustandState/useExpenseWizard';
import { useCategory } from '../../zustandState/useCategory';
import { STRINGS } from '../../strings/hebrew';

type EndProcessStepType = {};

const EndProcessStep = ({}: EndProcessStepType) => {
  const subCategoryId = useExpenseWizard(state => state.subCategoryId);
  const categoryId = useExpenseWizard(state => state.categoryId);

  const findCategoryById = useCategory(state => state.findCategoryById);
  const expenseObj = findCategoryById(categoryId);
  console.log(expenseObj, 'expenseObj');
  const currentSubCategory = expenseObj?.subCategories.filter(
    item => item.subCategoryId === subCategoryId,
  );

  const isSubExist = currentSubCategory
    ? currentSubCategory?.[0]?.subCategoryName
    : '';

  return (
    <View style={styles.container}>
      <Text style={styles.text}>{STRINGS.EXPENSE_SUCCEDED}</Text>
      <Text
        style={styles.text}
      >{`${STRINGS.EXPENSE_IN}: ${expenseObj?.categoryName} - ${isSubExist}`}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 22,
  },
});

export default EndProcessStep;
