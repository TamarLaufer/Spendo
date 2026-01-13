import React, { useMemo } from 'react';
import { useExpenses } from '../../zustandState/useExpenses';
import { formatAmount } from '../../utils/formatting';
import {
  BalanceAmount,
  BalanceTextContainer,
  Container,
  HeaderText,
  RegularText,
} from './Balance.styles';
import { STRINGS } from '../../strings/hebrew';

const Balance = () => {
  const now = new Date();
  const targetYear = now.getFullYear();
  const month0to11 = now.getMonth();
  const expenses = useExpenses(state => state.expenses);

  const balanceCalc = useMemo(() => {
    return expenses.reduce((sum, expense) => {
      const date = expense.createdAt;

      if (!(date instanceof Date) || Number.isNaN(date.getTime())) {
        return sum;
      }

      const year = date?.getFullYear();
      const month = date.getMonth();
      const isThisMonth = month === month0to11;
      const isThisYear = year === targetYear;
      return isThisYear && isThisMonth ? sum + expense.amount : sum;
    }, 0);
  }, [expenses, targetYear, month0to11]);

  return (
    <Container>
      {/* TODO: get name from user */}
      <HeaderText>{STRINGS.HELLO_USER.replace('{{name}}', 'תמר')}</HeaderText>
      <BalanceTextContainer>
        <RegularText>{STRINGS.MONTH_EXPENSES_TEXT}</RegularText>
        <BalanceAmount>{formatAmount(balanceCalc)}</BalanceAmount>
      </BalanceTextContainer>
    </Container>
  );
};

export default Balance;
