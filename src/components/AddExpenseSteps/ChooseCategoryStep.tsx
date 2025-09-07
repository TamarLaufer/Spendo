import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useExpenseWizard } from '../../zustandState/useExpenseWizard';
import { STRINGS } from '../../strings/hebrew';
import { useCategory } from '../../zustandState/useCategory';
import TransactionList from '../TransactionList/TransactionList';
import { Icons } from '../../assets/icons';

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
      <Text>{STRINGS.ADD_CATEGORY}</Text>
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
