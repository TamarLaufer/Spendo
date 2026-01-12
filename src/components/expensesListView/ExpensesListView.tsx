import React, { useCallback } from 'react';
import { FlatList } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

import TransactionRow from '../transactionRow/TransactionRow';

import { useCategory } from '../../zustandState/useCategory';
import { useSubcatIndex } from '../../zustandState/useSubCategoriesIndex';
import { useEnsureSubcatIndex } from '../../hooks/useEnsureSubcatIndex';

import { IconRegistry } from '../../assets/icons';
import { STRINGS } from '../../strings/hebrew';

import type { RootStackParamsType } from '../../navigation/types';
import type { ExpenseModel } from '../../firebase/services/expenses';
import {
  ContentContainer,
  HeaderContainer,
  HeaderText,
  LinkPressable,
  LinkText,
  ListWrapper,
  NoExpensesText,
  Separator,
} from './ExpensesListView.styles';

type RootNav = NativeStackNavigationProp<RootStackParamsType>;

type ExpensesListViewProps = {
  data: ExpenseModel[];
  header?: boolean;
  link?: boolean;
};

const ExpensesListView = ({ data, header, link }: ExpensesListViewProps) => {
  const navigation = useNavigation<RootNav>();

  useEnsureSubcatIndex(data.map(expense => expense.categoryId));

  const subIndex = useSubcatIndex(state => state.index);
  const findCategoryById = useCategory(state => state.findCategoryById);

  const handleExpensePress = useCallback(
    (expense: ExpenseModel) => {
      navigation.navigate('DetailsExpense', {
        expenseId: expense.id,
        categoryId: expense.categoryId,
        subCategoryId: expense.subCategoryId ?? undefined,
      });
    },
    [navigation],
  );

  const SeparatorComponent = Separator;

  const renderItem = ({ item }: { item: ExpenseModel }) => {
    const category = findCategoryById(item.categoryId);
    const Icon = category?.icon ? IconRegistry[category.icon] : undefined;

    const subCategoryName = item.subCategoryId
      ? subIndex[item.categoryId]?.[item.subCategoryId]?.name
      : undefined;

    return (
      <TransactionRow
        text={category?.name ?? ''}
        subText={subCategoryName}
        icon={Icon}
        amount={item.amount}
        createdAt={item.createdAt ?? null}
        onPress={() => handleExpensePress(item)}
      />
    );
  };

  return (
    <ContentContainer>
      {header && (
        <HeaderContainer>
          <HeaderText>{STRINGS.LAST_EXPENSES}</HeaderText>
        </HeaderContainer>
      )}

      {data.length === 0 ? (
        <NoExpensesText>{STRINGS.NO_EXPENSES_YET}</NoExpensesText>
      ) : (
        <ListWrapper>
          <FlatList
            data={data}
            keyExtractor={item => item.id}
            renderItem={renderItem}
            scrollEnabled={false}
            ListHeaderComponent={SeparatorComponent}
            ItemSeparatorComponent={SeparatorComponent}
          />
        </ListWrapper>
      )}

      {link && (
        <LinkPressable onPress={() => navigation.navigate('AllExpenses')}>
          <LinkText>{STRINGS.TO_ALL_EXPENSES}</LinkText>
        </LinkPressable>
      )}
    </ContentContainer>
  );
};

export default ExpensesListView;
