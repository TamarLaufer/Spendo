import { SectionList } from 'react-native';
import React from 'react';
import { ExpensesMonthSection } from '../../hooks/useExpensesByMonth';
import { ExpenseModel } from '../../firebase/services/expensesService';
import {
  DateText,
  DateTextContainer,
  Separator,
} from './ExpenseByMonthListView.styles';
import TransactionRow from '../transactionRow/TransactionRow';
import { useCategory } from '../../zustandState/useCategory';
import { IconRegistry } from '../../assets/icons';

type ExpenseByMonthListViewProps = {
  sections: ExpensesMonthSection[];
};

const ExpenseByMonthListView = ({ sections }: ExpenseByMonthListViewProps) => {
  const findCategoryById = useCategory(state => state.findCategoryById);

  const renderItem = ({ item }: { item: ExpenseModel }) => {
    const category = findCategoryById(item.categoryId);
    return (
      <TransactionRow
        text={category?.name ?? ''}
        amount={item.amount}
        createdAt={item.createdAt}
        icon={
          category?.icon && IconRegistry[category.icon]
            ? IconRegistry[category.icon]
            : undefined
        }
      />
    );
  };

  return (
    <SectionList
      sections={sections}
      keyExtractor={(item: ExpenseModel) => item.id}
      stickySectionHeadersEnabled={true}
      renderSectionHeader={({ section }) => (
        <DateTextContainer>
          <DateText>{section.title}</DateText>
        </DateTextContainer>
      )}
      renderItem={renderItem}
      ListHeaderComponent={Separator}
      ItemSeparatorComponent={Separator}
    />
  );
};
export default ExpenseByMonthListView;
