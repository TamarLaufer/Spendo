import { useEffect, useMemo } from 'react';
import { useCategory } from '../../zustandState/useCategory';
import { useExpenses } from '../../zustandState/useExpenses';
import { ActivityIndicator, ScrollView, StyleSheet, Text } from 'react-native';
import { formatAmount } from '../../functions/functions';
import TransactionList from '../TransactionList/TransactionList';

const LastExpenses = () => {
  const expenses = useExpenses(s => s.expenses);
  const loading = useExpenses(s => s.loading);
  const error = useExpenses(s => s.error);
  const { findCategoryById } = useCategory();
  const loadExpenses = useExpenses(s => s.loadExpenses);

  useEffect(() => {
    loadExpenses();
  }, [loadExpenses]);

  const firstExpenses = useMemo(() => expenses.slice(0, 5), [expenses]);
  // const [fiveFirst, setFiveFirst] = useState();

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={{
        flex: 1,
        marginHorizontal: 20,
        justifyContent: 'center',
        backgroundColor: 'pink',
      }}
    >
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
              // בהמשך: ניווט למסך פרטי הוצאה
            },
          })}
        />
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {},
  text: {
    fontFamily: 'Assistant',
    fontSize: 20,
  },
});

export default LastExpenses;
