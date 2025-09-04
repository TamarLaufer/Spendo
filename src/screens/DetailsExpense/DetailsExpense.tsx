import { View, Text, StyleSheet } from 'react-native';
import React from 'react';
import { useExpenses } from '../../zustandState/useExpenses';
import { useRoute, type RouteProp } from '@react-navigation/native';
import { RootStackParamsType } from '../../navigation/types';
import { useCategory } from '../../zustandState/useCategory';
import { formatAmount, formatHebrewDate } from '../../functions/functions';
import Logo from '../../assets/icons/MessyDoodle.svg';

type DetailsRoute = RouteProp<RootStackParamsType, 'DetailsExpense'>;

const DetailsExpense = () => {
  const {
    params: { expenseId, subCategoryId },
  } = useRoute<DetailsRoute>();

  const findExpenseById = useExpenses(state => state.findExpenseById);
  const findSubCategoryById = useCategory(state => state.findSubCategoryById);
  const findCategoryById = useCategory(state => state.findCategoryById);

  const expense = findExpenseById(expenseId);

  if (!expense) {
    return <Text>טוען/לא נמצא</Text>;
  }
  const category = findCategoryById(expense.categoryId);
  const finalSubId = expense.subCategoryId ?? subCategoryId;
  console.log(expense.subCategoryId, 'expense.subCategoryId');

  const subCategory = findSubCategoryById(expense.categoryId, finalSubId);

  const texts = [
    `הוצאה של ${category?.categoryName}`,
    `בסך ${formatAmount(expense.amount)}`,
    formatHebrewDate(expense.createdAt),
    subCategory?.subCategoryName,
    `ב${expense.paymentMethod} `,
  ];

  const renderText = texts.map((text, i) => {
    return (
      <Text key={i} style={styles.text}>
        {text}
      </Text>
    );
  });

  return (
    <View style={styles.container}>
      <Logo width={280} height={280} />
      <View style={styles.textContainer}>{renderText}</View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textContainer: {
    flex: 1,
    alignItems: 'center',
  },
  text: {
    fontSize: 24,
    fontFamily: 'PlaypenSansHebrew-Regular',
    marginVertical: 10,
  },
});

export default DetailsExpense;
