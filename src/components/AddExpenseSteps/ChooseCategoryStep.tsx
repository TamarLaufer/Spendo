import React, { useState } from 'react';
import { View, StyleSheet, Pressable, Text } from 'react-native';
import { useExpenseWizard } from '../../zustandState/useExpenseWizard';
import { useCategory } from '../../zustandState/useCategory';
import TransactionList from '../TransactionList/TransactionList';
import AddCategory from '../AddCategory';
import { theme } from '../../theme/theme';
import { IconRegistry } from '../../assets/icons';

const ChooseCategoryStep = () => {
  const { categoryId, setCategoryId } = useExpenseWizard();
  const handleContinue = useExpenseWizard(state => state.handleContinue);
  const categoriesList = useCategory(state => state.categories);
  const [isdisplayAddCategory, setDisplayAddCategory] = useState(false);

  const handleCategorySelect = (selectedCategoryId: string) => {
    setCategoryId(selectedCategoryId);
    handleContinue();
  };

  const handleDisplayAddingPress = () => {
    setDisplayAddCategory(true);
  };

  return (
    <View style={styles.container}>
      <TransactionList
        keyExtractor={category => category.categoryId}
        data={categoriesList}
        mapItem={category => ({
          text: category.categoryName,
          onPress: () => handleCategorySelect(category.categoryId),
          selected: category.categoryId === categoryId,
          icon: category?.icon ? IconRegistry[category.icon] : undefined,
        })}
      />
      {!isdisplayAddCategory && (
        <Pressable
          style={styles.addCategory}
          onPress={handleDisplayAddingPress}
        >
          <Text style={styles.buttonText}>הוספת קטגוריה חדשה</Text>
        </Pressable>
      )}
      {isdisplayAddCategory && (
        <AddCategory setDisplayAddCategory={setDisplayAddCategory} />
      )}
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
  addCategory: {
    marginTop: 12,
    backgroundColor: theme.color.lightBlue,
    padding: 14,
    borderRadius: 12,
    alignItems: 'center',
  },
  buttonText: { color: 'white', fontSize: 18, fontWeight: '700' },
});

export default ChooseCategoryStep;
