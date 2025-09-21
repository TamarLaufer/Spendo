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

type DetailsRoute = RouteProp<RootStackParamsType, 'DetailsExpense'>;
type RootNav = NativeStackNavigationProp<RootStackParamsType>;

const DetailsExpense = () => {
  const {
    params: { expenseId, subCategoryId },
  } = useRoute<DetailsRoute>();

  const findExpenseById = useExpenses(state => state.findExpenseById);
  const findSubCategoryById = useCategory(state => state.findSubCategoryById);
  const findCategoryById = useCategory(state => state.findCategoryById);
  const deleteExpense = useExpenses(state => state.deleteExpense);
  const expense = findExpenseById(expenseId);
  const { goBack } = useNavigation<RootNav>();

  const [isModalVisible, setModalVisible] = useState(false);

  if (!expense) {
    return <Text>{STRINGS.LOADING_OR_NOT_FOUND}</Text>;
  }
  const category = findCategoryById(expense.categoryId);
  const finalSubId = expense.subCategoryId ?? subCategoryId;

  const subCategory = findSubCategoryById(expense.categoryId, finalSubId);

  const texts = [
    `הוצאה של ${category?.categoryName}, ${subCategory?.subCategoryName ?? ''}`,
    `בסך של ${formatAmount(expense.amount)}`,
    `בתאריך ${formatShortDate(expense.createdAt)}`,
    `ב${expense.paymentMethod} `,
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
          modalHeader="האם ברצונך למחוק את ההוצאה?"
          onClose={handleModal}
          visible={isModalVisible}
          modalButtonTextRight="לא, טעות"
          modalButtonTextLeft="כן, מחק בבקשה"
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
