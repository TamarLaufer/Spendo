import React, { useMemo } from 'react';
import {
  View,
  Text,
  Pressable,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

import TransactionList from '../TransactionList/TransactionList';
import { useShallow } from 'zustand/shallow';
import {
  useExpenses,
  type ExpensesState,
} from '../../zustandState/useExpenses';
import { useCategory } from '../../zustandState/useCategory';

import { IconRegistry } from '../../assets/icons';
import { STRINGS } from '../../strings/hebrew';
import { theme } from '../../theme/theme';
import type { RootStackParamsType } from '../../navigation/types';
import type { SubCategoryType } from '../../shared/categoryType';
import type { ExpenseModel } from '../../firebase/services/expenses';

type RootNav = NativeStackNavigationProp<RootStackParamsType>;

type ExpensesListViewPropsType = {
  numOfTransactions?: number;
  header?: boolean;
  link?: boolean;
  groupByMonth?: boolean;
};

const ExpensesListView = ({
  numOfTransactions,
  header,
  link,
  groupByMonth,
}: ExpensesListViewPropsType) => {
  // Zustand selector (prevent re-renders)
  const select = (state: ExpensesState) => ({
    expenses: state.expenses,
    error: state.error,
    loading: state.loading,
  });
  const { expenses, error, loading } = useExpenses(useShallow(select));

  const { findCategoryById } = useCategory();
  const navigation = useNavigation<RootNav>();

  const data = useMemo(
    () => (numOfTransactions ? expenses.slice(0, numOfTransactions) : expenses),
    [expenses, numOfTransactions],
  );

  const monthKey = (date: Date | null) => {
    if (!date) return 'unknown';
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    return `${year}-${month}`;
  };

  const monthTitleFromKey = (key: string) => {
    if (key === 'unknown') return 'תאריך לא ידוע';
    const [y, m] = key.split('-').map(Number);
    const d = new Date(y, (m ?? 1) - 1, 1);
    return d.toLocaleDateString('he-IL', { month: 'long', year: 'numeric' });
  };

  const subCategoryByCategory = (
    subs?: SubCategoryType[],
    id?: string | null,
  ) => subs?.find(s => s.subCategoryId === id);

  const sections = useMemo(() => {
    if (!groupByMonth) return [];

    const buckets = data.reduce<Record<string, ExpenseModel[]>>((acc, e) => {
      const key = monthKey(e.createdAt);
      (acc[key] ??= []).push(e);
      return acc;
    }, {});

    return Object.entries(buckets)
      .sort((a, b) => b[0].localeCompare(a[0]))
      .map(([key, arr]) => ({
        key,
        title: monthTitleFromKey(key),
        data: arr.sort(
          (a, b) =>
            (b.createdAt?.getTime() ?? 0) - (a.createdAt?.getTime() ?? 0),
        ),
      }));
  }, [groupByMonth, data]);

  const handleExpensePress = (expenseId: string, subCategoryId?: string) => {
    navigation.navigate('DetailsExpense', { expenseId, subCategoryId });
  };

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
        <Text style={styles.serverError}>{STRINGS.ERROE_IN_SERVER}</Text>
      ) : data.length === 0 ? (
        <Text style={styles.noExpenses}>{STRINGS.NO_EXPENSES_YET}</Text>
      ) : groupByMonth ? (
        <>
          {sections.map(section => (
            <View key={section.key} style={styles.sectionBlock}>
              <Text style={styles.monthHeader}>{section.title}</Text>

              <TransactionList
                data={section.data}
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
                      handleExpensePress(
                        item.id,
                        item.subCategoryId ?? undefined,
                      ),
                    icon: Icon,
                    createdAt: item.createdAt ?? null,
                    amount: item.amount,
                    subText: sub?.subCategoryName,
                  };
                }}
              />
            </View>
          ))}
        </>
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
              amount: item.amount,
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
  contentContainer: {
    marginHorizontal: 20,
  },
  headerContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  header: {
    fontFamily: 'Assistant',
    fontSize: 22,
    paddingBottom: 5,
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
  monthHeader: {
    fontSize: 18,
    fontWeight: '700',
    marginTop: 12,
    textAlign: 'center',
    paddingVertical: 4,
    width: '60%',
    alignSelf: 'center',
  },
  sectionBlock: {
    marginTop: 8,
  },
});

export default ExpensesListView;
