import { StyleSheet, Text, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import ExpensesListView from '../../components/expensesListView/ExpensesListView';
import { STRINGS } from '../../strings/hebrew';

const AllExpenses = () => {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    requestAnimationFrame(() => {
      setReady(true);
    });
  }, []);

  return (
    <>
      <View style={styles.headerContainer}>
        <Text style={styles.header}>{STRINGS.ALL_EXPENSES}</Text>
      </View>
      {ready && <ExpensesListView groupByMonth />}
    </>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    flex: 1,
    alignItems: 'center',
    marginVertical: 15,
  },
  header: {
    fontSize: 24,
    fontWeight: '700',
  },
});
export default AllExpenses;
