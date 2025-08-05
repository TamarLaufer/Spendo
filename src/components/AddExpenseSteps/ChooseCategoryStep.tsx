import React from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { useExpenseWizard } from '../../zustandState/useExpenseWizard';
import { theme } from '../../theme/theme';
import { STRINGS } from '../../strings/hebrew';
import { useCategory } from '../../zustandState/useCategory';

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
      {categoriesList.map(category => (
        <View key={category.categoryId}>
          <Pressable
            style={[
              styles.categoryContainer,
              categoryId === category.categoryId && styles.selectedCategory,
            ]}
            onPress={() => handleCategorySelect(category.categoryId)}
          >
            <Text
              style={[
                styles.category,
                categoryId === category.categoryId &&
                  styles.selectedCategoryText,
              ]}
            >
              {category.categoryName}
            </Text>
          </Pressable>
        </View>
      ))}
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

export default ChooseCategoryStep;
