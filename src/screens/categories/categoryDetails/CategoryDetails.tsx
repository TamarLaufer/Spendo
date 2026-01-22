import React from 'react';
import {
  Container,
  HeaderContainer,
  HeaderSubCatText,
  HeaderText,
  IconAndHeaderContainer,
  IconContainer,
  SubCatList,
  SubCatText,
  SubText,
  SubTextContainer,
} from './CategoryDetails.styles';
import { RootStackParamsType } from '../../../navigation/types';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useSubcatIndex } from '../../../zustandState/useSubCategoriesIndex';
import { SubCategoryType } from '../../../shared/categoryType';
import { IconKey } from '../../../assets/icons';
import { getIconComponent } from '../../../utils/getIconComponent';
import { formatAmount } from '../../../utils/formatting';
import { useBudgetStats } from '../../../hooks/useBudgetStats';
import useCategoryById from '../../../hooks/useCategoryById';

type NativePropsType = NativeStackScreenProps<
  RootStackParamsType,
  'CategoryDetails'
>;

function SubCategoryItem({ subCategory }: { subCategory: SubCategoryType }) {
  return <SubCatText>{subCategory.name}</SubCatText>;
}

const CategoryDetails = ({ route }: NativePropsType) => {
  const { categoryId } = route.params;
  const category = useCategoryById(categoryId);
  const subcatMap = useSubcatIndex(state =>
    state.index[categoryId] ? state.index[categoryId] : null,
  );
  const subcatList = subcatMap ? Object.values(subcatMap) : [];

  const { byCategory, total } = useBudgetStats();

  const Icon = category?.icon
    ? getIconComponent(category?.icon as IconKey)
    : undefined;

  console.log('categoryId:', categoryId);
  console.log('categoryStats:', total.max);

  return (
    <Container>
      <HeaderContainer>
        <IconAndHeaderContainer>
          <IconContainer>
            {Icon && <Icon width={45} height={45} />}
          </IconContainer>
          <HeaderText> {category?.name}</HeaderText>
        </IconAndHeaderContainer>
        <SubTextContainer>
          <SubText>סכום מרבי: {formatAmount(category?.maxAmount ?? 0)}</SubText>
        </SubTextContainer>
        <SubTextContainer>
          <SubText>
            כמה הוצאתי החודש? {formatAmount(byCategory[categoryId]?.spent ?? 0)}
          </SubText>
        </SubTextContainer>
      </HeaderContainer>
      <SubCatList>
        <HeaderSubCatText>תתי קטגוריות</HeaderSubCatText>
        {subcatList.map(sub => (
          <SubCategoryItem key={sub.id} subCategory={sub} />
        ))}
      </SubCatList>
    </Container>
  );
};

export default CategoryDetails;
