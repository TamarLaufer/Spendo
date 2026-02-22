import React from 'react';
import TransactionRow from '../transactionRow/TransactionRow';
import { useCategory } from '../../zustandState/useCategory';
import { useSubcatIndex } from '../../zustandState/useSubCategoriesIndex';
import { IconKey, IconRegistry } from '../../assets/icons';
import WithSkeleton from '../skeleton/withSkeleton/WithSkeleton';
import RowSkeleton from '../skeleton/rowSkeleton/RowSkeleton';
import type { ExpenseModel } from '../../firebase/services/expensesService';

type ExpenseRowViewProps = {
  expense: ExpenseModel;
  onPress: (expense: ExpenseModel) => void;
};

const ExpenseRowView = ({ expense, onPress }: ExpenseRowViewProps) => {
  const subIndex = useSubcatIndex(state => state.index);
  const findCategoryById = useCategory(state => state.findCategoryById);

  const category = findCategoryById(expense.categoryId);

  const Icon = category?.icon
    ? IconRegistry[category.icon as IconKey]
    : undefined;

  const subCategoryName = expense.subCategoryId
    ? subIndex[expense.categoryId]?.[expense.subCategoryId]?.name
    : undefined;

  const isReady = !!category;

  return (
    <WithSkeleton ready={isReady} skeleton={<RowSkeleton />}>
      <TransactionRow
        text={category?.name ?? ''}
        subText={subCategoryName}
        icon={Icon}
        amount={expense.amount}
        createdAt={expense.createdAt ?? null}
        onPress={() => onPress(expense)}
      />
    </WithSkeleton>
  );
};

export default ExpenseRowView;
