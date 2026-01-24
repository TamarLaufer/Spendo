import React, { useState } from 'react';
import {
  BoldText,
  Container,
  HeaderContainer,
  HeaderText,
  IconAndHeaderContainer,
  IconContainer,
  SubCategoriesListContainer,
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
import ItemActions from '../../../components/ItemActions/ItemActions';
import PopModal from '../../../components/popModal/PopModal';
import { useNavigation } from '@react-navigation/native';
import { RootNav } from '../../expenses/expenseDetails/types';
import Delete from '../../../assets/icons/trash.svg';

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
  const [activeModal, setActiveModal] = useState<null | 'delete' | 'edit'>(
    null,
  );
  const { goBack, navigate } = useNavigation<RootNav>();
  const { byCategory } = useBudgetStats();

  const Icon = category?.icon
    ? getIconComponent(category?.icon as IconKey)
    : undefined;

  const handleDeletePress = () => {
    setActiveModal('delete');
  };

  const handleEditPress = () => {
    navigate('EditCategory', { categoryId });
  };

  const handleModal = () => {
    setActiveModal(null);
  };

  const handleDeleteFinalPress = () => {
    setActiveModal(null);
    deleteCategory(categoryId);
    goBack();
  };

  return (
    <Container>
      <HeaderContainer>
        <IconAndHeaderContainer>
          <IconContainer>
            {Icon && <Icon width={43} height={43} />}
          </IconContainer>
          <HeaderText>{category?.name}</HeaderText>
        </IconAndHeaderContainer>
        <SubTextContainer>
          <SubText>{STRINGS.MAX_AMOUNT}:</SubText>
          <BoldText>{formatAmount(category?.maxAmount ?? 0)}</BoldText>
        </SubTextContainer>
        <SubTextContainer>
          <SubText>
            {STRINGS.HOW_MUCH_I_SPENT_THIS_MONTH.replace(
              '{{categoryName}}',
              category?.name ?? '',
            )}
          </SubText>
          <BoldText>
            {formatAmount(byCategory[categoryId]?.spent ?? 0)}
          </BoldText>
        </SubTextContainer>
      </HeaderContainer>
      <SubCategoriesListContainer>
        <SubCategoriesList subCategories={subcatList} />
      </SubCategoriesListContainer>
      {activeModal === 'delete' && (
        <PopModal
          modalHeader={STRINGS.DO_YOU_WANT_TO_DELETE}
          onClose={handleModal}
          visible={activeModal === 'delete'}
          modalButtonTextRight={STRINGS.NO_MISTAKE}
          modalButtonTextLeft={STRINGS.YES_PLEASE_DELETE}
          onConfirm={handleDeleteFinalPress}
          onCancel={handleModal}
        >
          <Delete width={70} height={70} />
        </PopModal>
      )}
      <ItemActions
        onDeletePress={handleDeletePress}
        onEditPress={handleEditPress}
      />
    </Container>
  );
};

export default CategoryDetails;
