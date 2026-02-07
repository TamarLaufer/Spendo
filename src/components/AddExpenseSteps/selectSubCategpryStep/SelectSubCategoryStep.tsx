import React, { useCallback } from 'react';
import { useExpenseWizard } from '../../../zustandState/useExpenseWizard';
import { SubCategoryType } from '../../../shared/categoryType';
import { useSubcatIndex } from '../../../zustandState/useSubCategoriesIndex';
import { useExpenseWizardNavigation } from '../../../hooks/useExpenseWizardNavigation';
import { STRINGS } from '../../../strings/hebrew';
import { Container, Msg, Row, RowText } from './SelectSubCategoryStep.styles';
import Separator from '../../separator/Separator';
import { BottomSheetFlatList } from '@gorhom/bottom-sheet';

const SelectSubCategoryStep = () => {
  const categoryId = useExpenseWizard(state => state.categoryId);
  const setSubCategoryId = useExpenseWizard(state => state.setSubCategoryId);
  const { handleContinue } = useExpenseWizardNavigation();
  const selectedSubCategoryId = useExpenseWizard(state => state.subCategoryId);

  const subIndex = useSubcatIndex(state =>
    categoryId ? state.index[categoryId] ?? {} : {},
  );

  const rows = React.useMemo(() => Object.values(subIndex), [subIndex]);

  const handleSelect = useCallback(
    (subId: string) => {
      setSubCategoryId(subId);
      handleContinue();
    },
    [setSubCategoryId, handleContinue],
  );

  const renderItem = useCallback(
    ({ item }: { item: SubCategoryType }) => {
      return (
        <Row
          onPress={() => handleSelect(item.id)}
          isSelected={item.id === selectedSubCategoryId}
        >
          <RowText>{item.name}</RowText>
        </Row>
      );
    },
    [handleSelect, selectedSubCategoryId],
  );

  if (!categoryId) {
    return <Msg>{STRINGS.SELECT_CATEGORY_FIRST}</Msg>;
  }

  if (rows.length === 0) {
    return <Msg>{STRINGS.NO_SUB_CATEGORIES}</Msg>;
  }

  return (
    <Container>
      <BottomSheetFlatList
        data={rows}
        keyExtractor={item => item.id}
        renderItem={renderItem}
        ItemSeparatorComponent={Separator}
        showsVerticalScrollIndicator={false}
      />
    </Container>
  );
};

export default SelectSubCategoryStep;
