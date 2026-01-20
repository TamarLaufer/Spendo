import { Text } from 'react-native';
import React, { useState } from 'react';
import { useExpenses } from '../../../zustandState/useExpenses';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useCategory } from '../../../zustandState/useCategory';
import { formatAmount, formatShortDate } from '../../../utils/formatting';
import Logo from '../../../assets/icons/expense.svg';
import { STRINGS } from '../../../strings/hebrew';
import Delete from '../../../assets/icons/trash.svg';
import { DetailsRoute, RootNav } from './types';
import {
  AmountText,
  BoldText,
  Container,
  DeleteButtonText,
  DeleteContainer,
  DetailText,
  EditButtonText,
  EditContainer,
  Elements,
  LogoContainer,
  TextContainer,
} from './ExpenseDetails.styles';
import { useSubcatIndex } from '../../../zustandState/useSubCategoriesIndex';
import PopModal from '../../../components/popModal/PopModal';

const ExpenseDetails = () => {
  const {
    params: { expenseId, subCategoryId, categoryId },
  } = useRoute<DetailsRoute>();

  const subCat = useSubcatIndex(
    s => s.index[categoryId]?.[subCategoryId ?? ''],
  );
  const findCategoryById = useCategory(state => state.findCategoryById);
  const deleteExpense = useExpenses(state => state.deleteExpense);
  const expense = useExpenses(state => state.findExpenseById(expenseId));
  const { goBack } = useNavigation<RootNav>();
  const [activeModal, setActiveModal] = useState<null | 'delete' | 'edit'>(
    null,
  );

  const navigation = useNavigation<RootNav>();

  if (!expense) {
    return <Text>{STRINGS.LOADING_OR_NOT_FOUND}</Text>;
  }
  const category = findCategoryById(expense.categoryId);

  const handleDeleteFinalPress = () => {
    setActiveModal(null);
    deleteExpense(expense.id);
    goBack();
  };

  const handleDeletePress = () => {
    setActiveModal('delete');
  };

  const handleModal = () => {
    setActiveModal(null);
  };

  const handleEditPress = () => {
    navigation.navigate('EditExpenseScreen', { expenseId, categoryId });
  };

  if (!category) return <Text>{STRINGS.LOADING_CATEGORY}</Text>;

  return (
    <Container>
      <LogoContainer>
        <Logo width={80} height={80} />
      </LogoContainer>
      <TextContainer>
        <AmountText>{formatAmount(expense.amount)}</AmountText>
        <DetailText>
          {STRINGS.ON} <BoldText>{category?.name}</BoldText>
          {subCat?.name ? `, ${subCat.name}` : ''}
        </DetailText>
        <DetailText>
          {STRINGS.ON_DATE}{' '}
          <BoldText>{formatShortDate(expense.createdAt)}</BoldText>
        </DetailText>
        <DetailText>
          {`${STRINGS.PAYMENT_PERFORMED_ON}${expense.paymentMethod}`}
        </DetailText>
        <DetailText>{expense?.note ?? ''}</DetailText>
      </TextContainer>
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
      <Elements>
        <DeleteContainer onPress={handleDeletePress}>
          <DeleteButtonText>{STRINGS.DELETE_EXPENSE}</DeleteButtonText>
        </DeleteContainer>
        <EditContainer onPress={handleEditPress}>
          <EditButtonText>{STRINGS.EDIT_EXPENSE}</EditButtonText>
        </EditContainer>
      </Elements>
    </Container>
  );
};

export default ExpenseDetails;
