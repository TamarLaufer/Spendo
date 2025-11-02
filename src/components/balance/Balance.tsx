import { StyleSheet, Text, View } from 'react-native';
import React, { useMemo } from 'react';
import { useExpenses } from '../../zustandState/useExpenses';
import { formatAmount } from '../../functions/functions';

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
      <Text style={styles.text}>היי, החודש הוצאת</Text>
      <Text style={styles.balanceAmount}>{formatAmount(balanceCalc)}</Text>
    </View>
  );
};

export default Balance;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    borderRadius: 20,
    elevation: 1.2,
    paddingVertical: 8,
  },
  text: {
    fontSize: 18,
  },
  balanceAmount: {
    fontSize: 38,
    fontFamily: 'PlaypenSansHebrew-Regular',
  },
});
