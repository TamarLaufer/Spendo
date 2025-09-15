import React, { useState } from 'react';
import { View, StyleSheet, Pressable, Text } from 'react-native';
import { useExpenseWizard } from '../../zustandState/useExpenseWizard';
import { useCategory } from '../../zustandState/useCategory';
import TransactionList from '../TransactionList/TransactionList';
import { Icons } from '../../assets/icons';
import AddCategory from '../AddCategory';
import { theme } from '../../theme/theme';

const ChooseCategoryStep = () => {
  const { categoryId, setCategoryId } = useExpenseWizard();
  const handleContinue = useExpenseWizard(state => state.handleContinue);
  const categoriesList = useCategory(state => state.categories);
  const [isdisplayAddCategory, setDisplayAddCategory] = useState(false);

  const handleCategorySelect = (selectedCategoryId: string) => {
    setCategoryId(selectedCategoryId);
    handleContinue();
  };

  return (
    <View style={styles.container}>
      <TransactionList
        keyExtractor={category => category.categoryId}
        data={categoriesList}
        mapItem={c => ({
          text: c.categoryName,
          onPress: () => handleCategorySelect(c.categoryId),
          selected: c.categoryId === categoryId,
        })}
        icon={Icons.Market}
      />
      {!isdisplayAddCategory && (
        <Pressable
          style={styles.addCategory}
          onPress={() => setDisplayAddCategory(!isdisplayAddCategory)}
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
