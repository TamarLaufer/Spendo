import React from 'react';

import { STRINGS } from '../../strings/hebrew';
import useExpensesByMonth from '../../hooks/useExpensesByMonth';
import ExpenseByMonthListView from '../../components/expenseByMonthListView/ExpenseByMonthListView';
import {
  Container,
  ExpenseByMonthContainer,
  Header,
  HeaderContainer,
} from './AllExpenses.styles';
import ScreenLayout from '../../components/screenLayout/ScreenLayout';

const AllExpenses = () => {
  const sections = useExpensesByMonth();

  return (
    <ScreenLayout>
      <Container>
        <HeaderContainer>
          <Header>{STRINGS.ALL_EXPENSES}</Header>
        </HeaderContainer>
        <ExpenseByMonthContainer>
          <ExpenseByMonthListView sections={sections.sections} />
        </ExpenseByMonthContainer>
      </Container>
    </ScreenLayout>
  );
};

export default AllExpenses;
