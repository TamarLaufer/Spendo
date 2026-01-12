import React from 'react';

import { STRINGS } from '../../strings/hebrew';
import useExpensesByMonth from '../../hooks/useExpensesByMonth';
import ExpenseByMonthListView from '../../components/expenseByMonthListView/ExpenseByMonthListView';
import { Container, Header, HeaderContainer } from './AllExpenses.styles';

const AllExpenses = () => {
  const sections = useExpensesByMonth();

  return (
    <Container>
      <HeaderContainer>
        <Header>{STRINGS.ALL_EXPENSES}</Header>
      </HeaderContainer>
      <ExpenseByMonthListView sections={sections.sections} />
    </Container>
  );
};

export default AllExpenses;
