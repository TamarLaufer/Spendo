import { View, Text, StyleSheet } from 'react-native';
import React, { useState } from 'react';
import { useExpenses } from '../../zustandState/useExpenses';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useCategory } from '../../zustandState/useCategory';
import { formatAmount, formatShortDate } from '../../utils/formatting';
import Logo from '../../assets/icons/expense.svg';
import { STRINGS } from '../../strings/hebrew';
import Delete from '../../assets/icons/trash.svg';
import { Pressable } from 'react-native';
import PopModal from '../../components/popModal/PopModal';
import { useSubCategories } from '../../hooks/useSubCategories';
import { DetailsRoute, RootNav } from './types';
import { theme } from '../../theme/theme';

const ExpenseDetails = () => {
  const {
    params: { expenseId, subCategoryId, categoryId },
  } = useRoute<DetailsRoute>();

  const { rows: subcats } = useSubCategories(categoryId);
  const subCat = subcats.find(subC => subC.id === subCategoryId);
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

  const texts = [
    `הוצאה של ${category?.name}, ${subCat?.name ?? ''}`,
    `בסך של ${formatAmount(expense.amount)}`,
    `בתאריך ${formatShortDate(expense.createdAt)}`,
    `ב${expense.paymentMethod} `,
    `${expense?.note ?? ''}`,
  ];

  const handleDeleteFinalPress = () => {
    setActiveModal(null);
    deleteExpense(expense.id);
    goBack();
  };
  const renderText = texts.map((text, i) => {
    return (
      <Text key={i} style={styles.detailText}>
        {text}
      </Text>
    );
  });

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
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Logo width={120} height={120} />
      </View>
      <View style={styles.textContainer}>{renderText}</View>
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
      <View style={styles.elements}>
        <Pressable onPress={handleDeletePress} style={styles.deleteContainer}>
          <Text style={styles.text}>מחיקת הוצאה</Text>
        </Pressable>
        <Pressable onPress={handleEditPress} style={styles.editContainer}>
          <Text style={styles.text}>עריכת הוצאה</Text>
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  logoContainer: {
    flex: 0.5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textContainer: {
    flex: 1,
    alignItems: 'center',
    marginBottom: 40,
  },
  text: {
    fontSize: 20,
    fontFamily: 'MPLUSRounded1c-Regular',
    color: 'white',
  },
  detailText: {
    fontSize: 26,
    fontFamily: 'MPLUSRounded1c-Regular',
    marginVertical: 10,
  },
  elements: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 20,
    flexDirection: 'row',
    gap: 17,
    marginBottom: 25,
  },
  deleteContainer: {
    backgroundColor: theme.color.pink,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  editContainer: {
    paddingHorizontal: 20,
    backgroundColor: theme.color.lightBlue,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 10,
  },
});

export default ExpenseDetails;
