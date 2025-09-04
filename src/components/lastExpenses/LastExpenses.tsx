import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
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
import { useNavigation } from '@react-navigation/native';
import type { RootStackParamsType } from '../../navigation/types';

type RootNav = NativeStackNavigationProp<RootStackParamsType>;

const LastExpenses = () => {
  const expenses = useExpenses(state => state.expenses);
  const loading = useExpenses(state => state.loading);
  const error = useExpenses(state => state.error);
  const { findCategoryById } = useCategory();

  const navigation = useNavigation<RootNav>();
  const firstExpenses = useMemo(() => expenses.slice(0, 3), [expenses]);

  const handleExpensePress = (expenseId: string, subCategoryId?: string) => {
    navigation.navigate('DetailsExpense', {
      expenseId,
      subCategoryId,
    });
  };

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
              onPress: () =>
                handleExpensePress(item.id, item.subCategoryId ?? undefined),
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
  },
});

export default LastExpenses;
