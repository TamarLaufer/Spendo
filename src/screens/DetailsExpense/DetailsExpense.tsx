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
import { Pressable } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import PopModal from '../../components/popModal/PopModal';
import { useSubCategories } from '../../hooks/useSubCategories';

type DetailsRoute = RouteProp<RootStackParamsType, 'DetailsExpense'>;
type RootNav = NativeStackNavigationProp<RootStackParamsType>;

const DetailsExpense = () => {
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

  const [isModalVisible, setModalVisible] = useState(false);

  console.log(expense, 'expense');
  if (!expense) {
    return <Text>{STRINGS.LOADING_OR_NOT_FOUND}</Text>;
  }
  const category = findCategoryById(expense.id);

  const texts = [
    `הוצאה של ${category?.name}, ${subCat?.name ?? ''}`,
    `בסך של ${formatAmount(expense.amount)}`,
    `בתאריך ${formatShortDate(expense.createdAt)}`,
    `ב${expense.paymentMethod} `,
    `הערות: ${expense?.note ?? ''}`,
  ];

  const handleDeletePress = () => {
    deleteExpense(expense.id);
    setModalVisible(false);
    goBack();
  };
  const renderText = texts.map((text, i) => {
    return (
      <Text key={i} style={styles.text}>
        {text}
      </Text>
    );
  });

  const handleModal = () => {
    setModalVisible(prev => !prev);
  };

  return (
    <View style={styles.container}>
      <View style={styles.messyContainer}>
        <Messy width={280} height={280} />
      </View>
      <View style={styles.textContainer}>{renderText}</View>
      <Pressable onPress={handleModal} style={styles.deleteContainer}>
        <PopModal
          modalHeader={STRINGS.DO_YOU_WANT_TO_DELETE}
          onClose={handleModal}
          visible={isModalVisible}
          modalButtonTextRight={STRINGS.NO_MISTAKE}
          modalButtonTextLeft={STRINGS.YES_PLEASE_DELETE}
          onConfirm={handleDeletePress}
          onCancel={handleModal}
        />
        <Delete width={40} height={40} />
      </Pressable>
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
});

export default DetailsExpense;
