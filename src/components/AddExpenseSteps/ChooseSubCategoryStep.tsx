import { Pressable, StyleSheet, Text, View } from 'react-native';
import { useExpenseWizard } from '../../zustandState/useExpenseWizard';
import { theme } from '../../theme/theme';
import { useCategory } from '../../zustandState/useCategory';

const ChooseSubCategoryStep = () => {
  const { categoryId } = useExpenseWizard();
  const handleContinue = useExpenseWizard(state => state.handleContinue);
  const findCategoryById = useCategory(state => state.findCategoryById);
  const selectedCategory = findCategoryById(categoryId);

  return (
    <View style={styles.container}>
      {selectedCategory?.subCategories.map(sub => {
        return (
          <Pressable
            key={sub.subCategoryId}
            style={[styles.categoryContainer]}
            onPress={handleContinue}
          >
            <Text style={styles.category}>{sub.subCategoryName}</Text>
          </Pressable>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 18,
    justifyContent: 'center',
    marginHorizontal: 35,
    gap: 25,
  },
  categoryContainer: {
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 15,
    elevation: 2,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  selectedCategory: {
    borderColor: theme.color.purple,
  },
  category: {
    height: 60,
    fontSize: 23,
    textAlign: 'center',
    verticalAlign: 'middle',
    color: '#333',
  },
  selectedCategoryText: {
    color: theme.color.dark_purple,
    fontWeight: 'bold',
  },
});

export default ChooseSubCategoryStep;
