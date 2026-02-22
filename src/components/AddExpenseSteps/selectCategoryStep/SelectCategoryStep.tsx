import React, { useState, useCallback } from 'react';
import { useExpenseWizard } from '../../../zustandState/useExpenseWizard';
import { useCategory } from '../../../zustandState/useCategory';
import AddCategory from '../../addCategory/AddCategorySection';
import { IconRegistry } from '../../../assets/icons';
import { useExpenseWizardNavigation } from '../../../hooks/useExpenseWizardNavigation';
import { CategoryType } from '../../../shared/categoryType';
import { BottomSheetFlatList } from '@gorhom/bottom-sheet';
import {
  ButtonText,
  Container,
  Row,
  RowText,
} from './SelectCategoryStep.styles';
import { AddCategoryButton } from '../../../screens/categories/allCategories/AllCategories.styles';
import { STRINGS } from '../../../strings/hebrew';
import Separator from '../../separator/Separator';

const SelectCategoryStep = () => {
  const categoryId = useExpenseWizard(state => state.categoryId);
  const setCategoryId = useExpenseWizard(state => state.setCategoryId);
  const { handleContinue } = useExpenseWizardNavigation();
  const categoriesList = useCategory(state => state.categories);
  const [isDisplayAddCategory, setDisplayAddCategory] = useState(false);
  const addRecentCategory = useCategory(state => state.addRecentCategory);
  const activeCategoriesList = categoriesList.filter(
    cat => cat.active !== false,
  );

  const handleCategorySelect = useCallback(
    (selectedCategoryId: string) => {
      setCategoryId(selectedCategoryId);
      addRecentCategory(selectedCategoryId);
      handleContinue(selectedCategoryId);
    },
    [setCategoryId, handleContinue, addRecentCategory],
  );

  const renderItem = useCallback(
    ({ item }: { item: CategoryType }) => {
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
    },
    [categoryId, handleCategorySelect],
  );

  return (
    <Container>
      <BottomSheetFlatList
        data={activeCategoriesList}
        keyExtractor={item => item.id}
        renderItem={renderItem}
        extraData={categoryId}
        ItemSeparatorComponent={Separator}
      />

      {!isDisplayAddCategory && (
        <AddCategoryButton onPress={() => setDisplayAddCategory(true)}>
          <ButtonText>{STRINGS.ADD_NEW_CATEGORY}</ButtonText>
        </AddCategoryButton>
      )}

      {isDisplayAddCategory && (
        <AddCategory setDisplayAddCategory={setDisplayAddCategory} />
      )}
    </Container>
  );
};

export default SelectCategoryStep;
