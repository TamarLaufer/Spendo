import React, { useCallback } from 'react';
import { FlatList } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

import TransactionRow from '../transactionRow/TransactionRow';

import { useCategory } from '../../zustandState/useCategory';
import { useSubcatIndex } from '../../zustandState/useSubCategoriesIndex';
import { useEnsureSubcatIndex } from '../../hooks/useEnsureSubcatIndex';

import { IconKey, IconRegistry } from '../../assets/icons';
import { STRINGS } from '../../strings/hebrew';

import type { RootStackParamsType } from '../../navigation/types';
import type { ExpenseModel } from '../../firebase/services/expensesService';
import {
  ContentContainer,
  HeaderContainer,
  HeaderText,
  LinkPressable,
  LinkText,
  ListWrapper,
  NoExpensesText,
} from './ExpensesListView.styles';
import WithSkeleton from '../skeleton/withSkeleton/WithSkeleton';
import RowSkeleton from '../skeleton/rowSkeleton/RowSkeleton';
import Separator from '../separator/Separator';

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

  const handleLinkPress = () => navigation.navigate('AllExpenses');

  const renderItem = ({ item }: { item: ExpenseModel }) => {
    const category = findCategoryById(item.categoryId);
    const Icon = category?.icon
      ? IconRegistry[category.icon as IconKey]
      : undefined;

    const subCategoryName = item.subCategoryId
      ? subIndex[item.categoryId]?.[item.subCategoryId]?.name
      : undefined;

    const isReady = !!category && (!item.subCategoryId || !!subCategoryName);

    return (
      <WithSkeleton ready={isReady} skeleton={<RowSkeleton />}>
        <TransactionRow
          text={category?.name ?? ''}
          subText={subCategoryName}
          icon={Icon}
          amount={item.amount}
          createdAt={item.createdAt ?? null}
          onPress={() => handleExpensePress(item)}
        />
      </WithSkeleton>
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
            ListHeaderComponent={Separator}
            ItemSeparatorComponent={Separator}
          />
        </ListWrapper>
      )}

      {link && (
        <LinkPressable onPress={handleLinkPress}>
          <LinkText>{STRINGS.TO_ALL_EXPENSES}</LinkText>
        </LinkPressable>
      )}
    </ContentContainer>
  );
};

export default ExpensesListView;
