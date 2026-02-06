import React, { useState, useCallback } from 'react';
import { FlatList } from 'react-native';
import { useExpenseWizard } from '../../../zustandState/useExpenseWizard';
import { useCategory } from '../../../zustandState/useCategory';
import AddCategory from '../../addCategory/AddCategorySection';
import { IconRegistry } from '../../../assets/icons';
import { useExpenseWizardNavigation } from '../../../hooks/useExpenseWizardNavigation';
import { CategoryType } from '../../../shared/categoryType';
import { ButtonText, Container, Row, RowText } from './SelectCategoryStep.styles';
import { AddCategoryButton } from '../../../screens/categories/allCategories/AllCategories.styles';

const SelectCategoryStep = () => {
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
      <Row
        isSelected={isSelected}
        onPress={() => handleCategorySelect(item.id)}
      >
        {Icon && <Icon width={26} height={26} />}
        <RowText>{item.name}</RowText>
      </Row>
    );
  };

  return (
    <Container>
      <FlatList
        data={categoriesList}
        keyExtractor={item => item.id}
        renderItem={renderItem}
      />

      {!isDisplayAddCategory && (
        <AddCategoryButton
          onPress={() => setDisplayAddCategory(true)}
        >
            <ButtonText>הוספת קטגוריה חדשה</ButtonText>
        </AddCategoryButton>
      )}

      {isDisplayAddCategory && (
        <AddCategory setDisplayAddCategory={setDisplayAddCategory} />
      )}
    </Container>
  );
};

export default SelectCategoryStep;

