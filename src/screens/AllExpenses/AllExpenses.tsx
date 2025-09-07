import { ScrollView } from 'react-native';
import React from 'react';
import ExpensesListView from '../../components/expensesListView/ExpensesListView';

const AllExpenses = () => {
  return (
    <ScrollView>
      <ExpensesListView />
    </ScrollView>
  );
};

export default AllExpenses;
