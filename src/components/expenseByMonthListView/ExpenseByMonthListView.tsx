import { FlatList } from 'react-native';
import React from 'react';
import { ExpensesMonthSection } from '../../hooks/useExpensesByMonth';
import { ExpenseModel } from '../../firebase/services/expenses';
import { formatAmount, formatShortDate } from '../../utils/formatting';
import {
  DateText,
  DateTextContainer,
  ExpenseText,
  ListContainer,
  OneRowContainer,
} from './ExpenseByMonthListView.styles';

type ExpenseByMonthListViewProps = {
  sections: ExpensesMonthSection[];
};

const renderItem = ({ item }: { item: ExpensesMonthSection }) => {
  return (
    <ListContainer key={item.key}>
      <DateTextContainer>
        <DateText>{item.title}</DateText>
      </DateTextContainer>
      {item.data.map((oneExpense: ExpenseModel) => {
        return (
          <OneRowContainer key={oneExpense.id}>
            <ExpenseText>{oneExpense.paymentMethod}</ExpenseText>
            <ExpenseText>{formatShortDate(oneExpense.createdAt)}</ExpenseText>
            <ExpenseText>{oneExpense.createdBy}</ExpenseText>
            <ExpenseText>{oneExpense.note}</ExpenseText>
            <ExpenseText>{formatAmount(oneExpense.amount)}</ExpenseText>
          </OneRowContainer>
        );
      })}
    </ListContainer>
  );
};

const ExpenseByMonthListView = ({ sections }: ExpenseByMonthListViewProps) => {
  return (
    <FlatList
      data={sections}
      renderItem={renderItem}
      keyExtractor={item => item.key}
    />
  );
};

export default ExpenseByMonthListView;
