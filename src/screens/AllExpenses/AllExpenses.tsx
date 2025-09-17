import { ScrollView, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import ExpensesListView from '../../components/expensesListView/ExpensesListView';

const AllExpenses = () => {
  return (
    <ScrollView>
      <View style={styles.headerContainer}>
        <Text style={styles.header}>כל ההוצאות</Text>
      </View>
      <ExpensesListView />
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
    fontSize: 22,
    fontWeight: '700',
  },
});
export default AllExpenses;
