import { Text } from 'react-native';
import React, { useState } from 'react';
import { useExpenses } from '../../../zustandState/useExpenses';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useCategory } from '../../../zustandState/useCategory';
import { formatAmount, formatShortDate } from '../../../utils/formatting';
import Logo from '../../../assets/icons/expense.svg';
import { STRINGS } from '../../../strings/hebrew';
import Delete from '../../../assets/icons/trash.svg';
import { ExpenseDetailsRoute, RootNav } from './types';
import {
  AmountText,
  BoldText,
  Container,
  DetailText,
  LogoContainer,
  NoteText,
  TextContainer,
} from './ExpenseDetails.styles';
import { useSubcatIndex } from '../../../zustandState/useSubCategoriesIndex';
import PopModal from '../../../components/popModal/PopModal';
import ItemActions from '../../../components/ItemActions/ItemActions';
import { getPaymentMethodLabel } from '../../../utils/paymentMethods';
import { PaymentMethods } from '../../../bottomSheetExpenses/types';

const ExpenseDetails = () => {
  const {
    params: { expenseId, subCategoryId, categoryId },
  } = useRoute<ExpenseDetailsRoute>();

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

  if (!expense.paymentMethodId) {
    return 'בחר אמצעי תשלום';
  }

  const category = findCategoryById(expense.categoryId);
  const paymentMethod = getPaymentMethodLabel(
    expense.paymentMethodId as PaymentMethods['id'],
  );

  const handleDeleteFinalPress = () => {
    setActiveModal(null);
    deleteExpense(expense.id);
    goBack();
  };

  const handleDeletePress = () => {
    setActiveModal('delete');
  };

  const handleEditPress = () => {
    navigation.navigate('EditExpense', { expenseId, categoryId });
  };

  const handleModal = () => {
    setActiveModal(null);
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
          {STRINGS.PAYMENT_PERFORMED_ON}{' '}
          <BoldText>
            {paymentMethod ? paymentMethod : STRINGS.NOT_SPECIFIED || 'לא צוין'}
          </BoldText>
        </DetailText>
        <NoteText>
          <DetailText>
            {expense?.note ? `${STRINGS.NOTE}: ${expense?.note}` : ''}
          </DetailText>
        </NoteText>
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
      <ItemActions
        onDeletePress={handleDeletePress}
        onEditPress={handleEditPress}
      />
    </Container>
  );
};

export default ExpenseDetails;
