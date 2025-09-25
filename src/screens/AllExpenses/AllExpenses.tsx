import { ScrollView, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import ExpensesListView from '../../components/expensesListView/ExpensesListView';
import { STRINGS } from '../../strings/hebrew';

const AllExpenses = () => {
  return (
    <ScrollView>
      <View style={styles.headerContainer}>
        <Text style={styles.header}>{STRINGS.ALL_EXPENSES}</Text>
      </View>
      <ExpensesListView groupByMonth />
    </ScrollView>
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
