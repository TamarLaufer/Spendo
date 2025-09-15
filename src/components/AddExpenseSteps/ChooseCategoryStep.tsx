import React from 'react';
import { View, StyleSheet } from 'react-native';
import { useExpenseWizard } from '../../zustandState/useExpenseWizard';
import { useCategory } from '../../zustandState/useCategory';
import TransactionList from '../TransactionList/TransactionList';
import { Icons } from '../../assets/icons';
import AddCategory from '../AddCategory';

const ChooseCategoryStep = () => {
  const { categoryId, setCategoryId } = useExpenseWizard();
  const handleContinue = useExpenseWizard(state => state.handleContinue);
  const categoriesList = useCategory(state => state.categories);

  const handleCategorySelect = (selectedCategoryId: string) => {
    setCategoryId(selectedCategoryId);
    handleContinue();
  };

  return (
    <View style={styles.container}>
      <TransactionList
        keyExtractor={c => c.categoryName}
        data={categoriesList}
        mapItem={c => ({
          text: c.categoryName,
          onPress: () => handleCategorySelect(c.categoryId),
          selected: c.categoryId === categoryId,
        })}
        icon={Icons.Market}
      />
      <AddCategory />
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

export default ChooseCategoryStep;
