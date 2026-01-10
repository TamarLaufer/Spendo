import { StyleSheet, Text, View } from 'react-native';
import React, { useMemo } from 'react';
import { useExpenses } from '../../zustandState/useExpenses';
import { formatAmount } from '../../utils/formatting';
import { theme } from '../../theme/theme';

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
    <View style={styles.container}>
      <Text style={styles.headerText}>היי תמר,</Text>
      <Text style={styles.text}>החודש הוצאת</Text>
      <Text style={styles.balanceAmount}>{formatAmount(balanceCalc)}</Text>
    </View>
  );
};

export default Balance;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 20,
    paddingHorizontal: 20,
    backgroundColor: theme.color.lightGreen,
    marginHorizontal: 30,
  },
  headerText: {
    fontSize: 24,
    fontFamily: 'MPLUSRounded1c-Bold',
  },
  text: {
    fontSize: 22,
    fontFamily: 'MPLUSRounded1c-Regular',
  },
  balanceAmount: {
    paddingTop: 10,
    fontSize: 36,
    fontFamily: 'MPLUSRounded1c-Regular',
  },
});
