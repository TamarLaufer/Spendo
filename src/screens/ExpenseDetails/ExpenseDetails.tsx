import { View, Text, StyleSheet } from 'react-native';
import React, { useState } from 'react';
import { useExpenses } from '../../zustandState/useExpenses';
import {
  useNavigation,
  useRoute,
  type RouteProp,
} from '@react-navigation/native';
import { RootStackParamsType } from '../../navigation/types';
import { useCategory } from '../../zustandState/useCategory';
import { formatAmount, formatShortDate } from '../../functions/functions';
import Messy from '../../assets/icons/MessyDoodle.svg';
import { STRINGS } from '../../strings/hebrew';
import Delete from '../../assets/icons/trash.svg';
import Edit from '../../assets/icons/edit.svg';
import { Pressable } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import PopModal from '../../components/popModal/PopModal';
import { useSubCategories } from '../../hooks/useSubCategories';

type DetailsRoute = RouteProp<RootStackParamsType, 'DetailsExpense'>;
type RootNav = NativeStackNavigationProp<RootStackParamsType>;

const ExpenseDetails = () => {
  const {
    params: { expenseId, subCategoryId, categoryId },
  } = useRoute<DetailsRoute>();

  const findExpenseById = useExpenses(state => state.findExpenseById);
  const { rows: subcats } = useSubCategories(categoryId);
  const subCat = subcats.find(subC => subC.id === subCategoryId);
  const findCategoryById = useCategory(state => state.findCategoryById);
  const deleteExpense = useExpenses(state => state.deleteExpense);
  const expense = findExpenseById(expenseId);
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
      <Text key={i} style={styles.text}>
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
      <View style={styles.messyContainer}>
        <Messy width={280} height={280} />
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
          <Delete width={80} height={80} />
        </PopModal>
      )}
      <View style={styles.elements}>
        <Pressable onPress={handleDeletePress} style={styles.deleteContainer}>
          <Delete width={36} height={36} />
        </Pressable>
        <Pressable onPress={handleEditPress} style={styles.deleteContainer}>
          <Edit width={33} height={33} />
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  messyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textContainer: {
    flex: 1,
    alignItems: 'center',
  },
  text: {
    fontSize: 26,
    fontFamily: 'PlaypenSansHebrew-Regular',
    marginVertical: 10,
  },
  deleteContainer: {
    paddingStart: 40,
    paddingBottom: 30,
  },
  elements: {
    flexDirection: 'row',
    gap: 30,
  },
});

export default ExpenseDetails;
