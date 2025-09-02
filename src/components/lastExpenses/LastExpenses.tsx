import { useMemo } from 'react';
import { useCategory } from '../../zustandState/useCategory';
import { useExpenses } from '../../zustandState/useExpenses';
import {
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { formatAmount } from '../../functions/functions';
import TransactionList from '../TransactionList/TransactionList';
import { STRINGS } from '../../strings/hebrew';

const LastExpenses = () => {
  const expenses = useExpenses(state => state.expenses);
  const loading = useExpenses(state => state.loading);
  const error = useExpenses(state => state.error);
  const { findCategoryById } = useCategory();

  const firstExpenses = useMemo(() => expenses.slice(0, 3), [expenses]);

  return (
    <>
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.contentContainter}
      >
        <View style={styles.headerContainer}>
          <Text style={styles.header}>{STRINGS.LAST_EXPENSES}</Text>
        </View>
        {loading && <ActivityIndicator />}
        {error && <Text>{error}</Text>}

        {!loading && !error && (
          <TransactionList
            data={firstExpenses}
            keyExtractor={item => item.id}
            mapItem={item => ({
              text: `${formatAmount(item.amount)} — ${
                findCategoryById(item.categoryId)?.categoryName ?? ''
              }`,
              onPress: () => {
                //TODO: Navigation to DetailExpense screen..
              },
            })}
          />
        )}
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {},
  headerContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  header: {
    fontFamily: 'Assistant',
    fontSize: 22,
    paddingBottom: 10,
  },
  text: {
    fontFamily: 'Assistant',
    fontSize: 24,
  },
  contentContainter: {
    flex: 1,
    marginHorizontal: 20,
    justifyContent: 'center',
    // backgroundColor: 'pink',
  },
});

export default LastExpenses;
