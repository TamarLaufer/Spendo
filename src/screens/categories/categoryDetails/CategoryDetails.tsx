import React from 'react';
import {
  Container,
  HeaderContainer,
  HeaderText,
  IconAndHeaderContainer,
  IconContainer,
  SubText,
  SubTextContainer,
} from './CategoryDetails.styles';
import { RootStackParamsType } from '../../../navigation/types';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useSubcatIndex } from '../../../zustandState/useSubCategoriesIndex';
import { IconKey } from '../../../assets/icons';
import { getIconComponent } from '../../../utils/getIconComponent';
import { formatAmount } from '../../../utils/formatting';
import { useBudgetStats } from '../../../hooks/useBudgetStats';
import useCategoryById from '../../../hooks/useCategoryById';
import SubCategoriesList from '../../../components/subCategoriesList/SubCategoriesList';
import { STRINGS } from '../../../strings/hebrew';

type NativePropsType = NativeStackScreenProps<
  RootStackParamsType,
  'CategoryDetails'
>;

const CategoryDetails = ({ route }: NativePropsType) => {
  const { categoryId } = route.params;
  const category = useCategoryById(categoryId);
  const subcatMap = useSubcatIndex(state =>
    state.index[categoryId] ? state.index[categoryId] : null,
  );
  const subcatList = subcatMap ? Object.values(subcatMap) : [];

  const { byCategory } = useBudgetStats();

  const Icon = category?.icon
    ? getIconComponent(category?.icon as IconKey)
    : undefined;

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
          <SubText>
            {STRINGS.MAX_AMOUNT}: {formatAmount(category?.maxAmount ?? 0)}
          </SubText>
        </SubTextContainer>
        <SubTextContainer>
          <SubText>
            {STRINGS.HOW_MUCH_I_SPENT_THIS_MONTH}{' '}
            {formatAmount(byCategory[categoryId]?.spent ?? 0)}
          </SubText>
        </SubTextContainer>
      </HeaderContainer>
      <SubCategoriesList subCategories={subcatList} />
    </Container>
  );
};

export default CategoryDetails;
