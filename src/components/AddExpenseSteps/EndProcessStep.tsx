import { StyleSheet, Text, View } from 'react-native';
import { useExpenseWizard } from '../../zustandState/useExpenseWizard';
import { useCategory } from '../../zustandState/useCategory';
import { STRINGS } from '../../strings/hebrew';
import { formatAmount } from '../../functions/functions';

const EndProcessStep = () => {
  const subCategoryId = useExpenseWizard(state => state.subCategoryId);
  const categoryId = useExpenseWizard(state => state.categoryId);
  const amount = useExpenseWizard(state => state.amount);

  const findCategoryById = useCategory(state => state.findCategoryById);
  const expenseObj = findCategoryById(categoryId);
  const paymentMethod = useExpenseWizard(state => state.paymentMethod);

  const currentSubCategory = expenseObj?.subCategories.find(
    item => item.subCategoryId === subCategoryId,
  );

  const isSubExist = currentSubCategory
    ? currentSubCategory?.subCategoryName
    : '';

  const isAmountExist = amount ? formatAmount(amount) : '';

  return (
    <View style={styles.container}>
      <View style={styles.textContainer}>
        <Text style={styles.text}>{STRINGS.EXPENSE_SUCCEDED}</Text>
        <Text style={styles.text}>{`${STRINGS.EXPENSE_IN}: ${
          expenseObj?.categoryName
        } ${isSubExist ? `- ${isSubExist}` : ''}`}</Text>
      </View>
      <Text
        style={styles.amountText}
      >{`${isAmountExist} ב${paymentMethod}`}</Text>
      {/* <Text style={styles.amountText}>{`ב${paymentMethod}`}</Text> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 200,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 25,
  },
  textContainer: { flex: 1 },
  text: {
    fontSize: 24,
    textAlign: 'center',
    verticalAlign: 'middle',
  },
  amountText: {
    fontSize: 33,
    textAlign: 'center',
    verticalAlign: 'middle',
  },
});

export default EndProcessStep;
