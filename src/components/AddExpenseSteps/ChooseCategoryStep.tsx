import React, { useState, useCallback } from 'react';
import { View, StyleSheet, Pressable, Text, FlatList } from 'react-native';
import { useExpenseWizard } from '../../zustandState/useExpenseWizard';
import { useCategory } from '../../zustandState/useCategory';
import AddCategory from '../addCategory/AddCategorySection';
import { theme } from '../../theme/theme';
import { IconRegistry } from '../../assets/icons';
import { useExpenseWizardNavigation } from '../../hooks/useExpenseWizardNavigation';
import { CategoryType } from '../../shared/categoryType';

const ChooseCategoryStep = () => {
  const categoryId = useExpenseWizard(state => state.categoryId);
  const setCategoryId = useExpenseWizard(state => state.setCategoryId);
  const { handleContinue } = useExpenseWizardNavigation();
  const categoriesList = useCategory(state => state.categories);
  const [isDisplayAddCategory, setDisplayAddCategory] = useState(false);

  const handleCategorySelect = useCallback(
    (selectedCategoryId: string) => {
      setCategoryId(selectedCategoryId);
      handleContinue();
    },
    [setCategoryId, handleContinue],
  );

  const renderItem = ({ item }: { item: CategoryType }) => {
    const Icon = item.icon ? IconRegistry[item.icon] : null;
    const isSelected = item.id === categoryId;

    return (
      <Pressable
        style={[styles.row, isSelected && styles.selectedRow]}
        onPress={() => handleCategorySelect(item.id)}
      >
        {Icon && <Icon width={26} height={26} />}
        <Text style={styles.rowText}>{item.name}</Text>
      </Pressable>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={categoriesList}
        keyExtractor={item => item.id}
        renderItem={renderItem}
      />

      {!isDisplayAddCategory && (
        <Pressable
          style={styles.addCategory}
          onPress={() => setDisplayAddCategory(true)}
        >
          <Text style={styles.buttonText}>הוספת קטגוריה חדשה</Text>
        </Pressable>
      )}

      {isDisplayAddCategory && (
        <AddCategory setDisplayAddCategory={setDisplayAddCategory} />
      )}
    </View>
  );
};

export default ChooseCategoryStep;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 18,
    marginHorizontal: 35,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 14,
    borderRadius: 12,
    backgroundColor: 'white',
    marginBottom: 8,
  },
  selectedRow: {
    borderWidth: 2,
    borderColor: theme.color.lightBlue,
  },
  rowText: {
    fontSize: 18,
    marginStart: 12,
  },
  addCategory: {
    marginTop: 12,
    backgroundColor: theme.color.lightBlue,
    padding: 14,
    borderRadius: 12,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: '700',
  },
});
