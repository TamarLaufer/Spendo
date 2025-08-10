import { useExpenseWizard } from '../../zustandState/useExpenseWizard';
import { useCategory } from '../../zustandState/useCategory';
import TransactionList from '../TransactionList/TransactionList';
import { StyleSheet, View } from 'react-native';

const ChooseSubCategoryStep = () => {
  const { categoryId, setSubCategoryId } = useExpenseWizard();
  const handleContinue = useExpenseWizard(state => state.handleContinue);
  const findCategoryById = useCategory(state => state.findCategoryById);
  const selectedCategory = findCategoryById(categoryId);

  const handleSubCategorySelect = (subCategoryId: string) => {
    setSubCategoryId(subCategoryId);
    handleContinue();
  };

  return (
    <View style={styles.container}>
      <TransactionList
        data={selectedCategory?.subCategories ?? []}
        mapItem={c => ({
          onPress: () => {
            handleSubCategorySelect(c.subCategoryId);
          },
          text: c.subCategoryName,
        })}
        keyExtractor={c => c.subCategoryId}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 18,
    justifyContent: 'center',
    marginHorizontal: 35,
  },
});

export default ChooseSubCategoryStep;
