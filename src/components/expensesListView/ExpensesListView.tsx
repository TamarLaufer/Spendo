import {
  View,
  Text,
  Pressable,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import React, { useMemo } from 'react';
import { ExpensesState, useExpenses } from '../../zustandState/useExpenses';
import { RootStackParamsType } from '../../navigation/types';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useCategory } from '../../zustandState/useCategory';
import { useNavigation } from '@react-navigation/native';
import { theme } from '../../theme/theme';
import { STRINGS } from '../../strings/hebrew';
import TransactionList from '../TransactionList/TransactionList';
import { useShallow } from 'zustand/shallow';
import { IconRegistry } from '../../assets/icons';
import { SubCategoryType } from '../../shared/categoryType';

type RootNav = NativeStackNavigationProp<RootStackParamsType>;

type ExpensesListViewPropsType = {
  numOfTransactions?: boolean;
  header?: boolean;
  link?: boolean;
};

const ExpensesListView = ({
  numOfTransactions,
  header,
  link,
}: ExpensesListViewPropsType) => {
  const select = (state: ExpensesState) => ({
    expenses: state.expenses,
    error: state.error,
    loading: state.loading,
  });

  const { expenses, error, loading } = useExpenses(useShallow(select));

  const { findCategoryById } = useCategory();

  const navigation = useNavigation<RootNav>();

  const data = useMemo(
    () => (numOfTransactions ? expenses.slice(0, 3) : expenses),
    [expenses, numOfTransactions],
  );

  const handleExpensePress = (expenseId: string, subCategoryId?: string) => {
    navigation.navigate('DetailsExpense', {
      expenseId,
      subCategoryId,
    });
  };

  const subCategoryByCategory = (
    subs?: SubCategoryType[],
    id?: string | null,
  ) => subs?.find(s => s.subCategoryId === id);

  return (
    <View style={styles.contentContainer}>
      {header && (
        <View style={styles.headerContainer}>
          <Text style={styles.header}>{STRINGS.LAST_EXPENSES}</Text>
        </View>
      )}
      {loading ? (
        <ActivityIndicator />
      ) : error ? (
        <Text style={styles.serverError}>
          תקלה בשרת כרגע, אנא נסו במועד מאוחר יותר
        </Text>
      ) : data.length === 0 ? (
        <Text style={styles.noExpenses}>אין עדיין הוצאות</Text>
      ) : (
        <TransactionList
          data={data}
          keyExtractor={item => item.id}
          mapItem={item => {
            const cat = findCategoryById(item.categoryId);
            const Icon = cat?.icon ? IconRegistry[cat.icon] : undefined;
            const sub = subCategoryByCategory(
              cat?.subCategories,
              item.subCategoryId,
            );

            return {
              text: `${cat?.categoryName ?? ''}`,
              onPress: () =>
                handleExpensePress(item.id, item.subCategoryId ?? undefined),
              icon: Icon,
              createdAt: item.createdAt ?? null,
              amount: item.amount ?? null,
              subText: sub?.subCategoryName,
            };
          }}
        />
      )}
      {link && (
        <Pressable
          onPress={() => navigation.navigate('AllExpenses')}
          style={styles.pressable}
        >
          <Text style={styles.linkToAllExpenses}>
            {STRINGS.TO_ALL_EXPENSES}
          </Text>
        </Pressable>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  header: {
    fontFamily: 'Assistant',
    fontSize: 22,
    paddingBottom: 5,
  },
  text: {
    fontFamily: 'Assistant',
    fontSize: 24,
  },
  contentContainer: {
    marginHorizontal: 20,
  },
  pressable: {
    justifyContent: 'center',
    alignItems: 'flex-end',
    paddingEnd: 10,
    paddingTop: 5,
  },
  linkToAllExpenses: {
    fontSize: 18,
    color: theme.color.lightBlue,
  },
  dataMissingContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    // paddingVertical: 10,
  },
  noExpenses: {
    fontFamily: 'Assistant',
    fontSize: 18,
  },
  serverError: {
    fontFamily: 'Assistant',
    fontSize: 18,
    color: 'red',
  },
});

export default ExpensesListView;
