import React, { useCallback } from 'react';
import { FlatList } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import ExpenseRowView from '../expenseRowView/ExpenseRowView';
import Separator from '../separator/Separator';
import { STRINGS } from '../../strings/hebrew';
import type { ExpenseModel } from '../../firebase/services/expensesService';
import {
  ContentContainer,
  HeaderContainer,
  HeaderText,
  LinkPressable,
  LinkText,
  NoExpensesText,
} from './ExpensesListView.styles';
import { RootNav } from '../../screens/expenseDetails/types';

type ExpensesListViewProps = {
  data: ExpenseModel[];
};

const ExpensesListView = ({ data }: ExpensesListViewProps) => {
  const navigation = useNavigation<RootNav>();

  const handleExpensePress = useCallback(
    (expense: ExpenseModel) => {
      navigation.navigate('DetailsExpense', {
        expenseId: expense.id,
        categoryId: expense.categoryId,
        subCategoryId: expense.subCategoryId ?? undefined,
      });
    },
    [navigation],
  );

  const handleLinkPress = () => navigation.navigate('AllExpenses');

  if (data.length === 0) {
    return <NoExpensesText>{STRINGS.NO_EXPENSES_YET}</NoExpensesText>;
  }

  return (
    <ContentContainer>
      <HeaderContainer>
        <HeaderText>{STRINGS.LAST_EXPENSES}</HeaderText>
      </HeaderContainer>

      <FlatList
        data={data}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <ExpenseRowView expense={item} onPress={handleExpensePress} />
        )}
        ItemSeparatorComponent={Separator}
        scrollEnabled={false}
      />

      <LinkPressable onPress={handleLinkPress}>
        <LinkText>{STRINGS.TO_ALL_EXPENSES}</LinkText>
      </LinkPressable>
    </ContentContainer>
  );
};

export default ExpensesListView;
