import { SectionList } from 'react-native';
import React from 'react';
import { ExpensesMonthSection } from '../../hooks/useExpensesByMonth';
import { ExpenseModel } from '../../firebase/services/expensesService';
import { DateText, DateTextContainer } from './ExpenseByMonthListView.styles';
import TransactionRow from '../transactionRow/TransactionRow';
import { useCategory } from '../../zustandState/useCategory';
import { IconRegistry } from '../../assets/icons';
import { useSubcatIndex } from '../../zustandState/useSubCategoriesIndex';
import { RootNav } from '../../screens/expenses/expenseDetails/types';
import { useNavigation } from '@react-navigation/native';
import Separator from '../separator/Separator';

type ExpenseByMonthListViewProps = {
  sections: ExpensesMonthSection[];
};

const ExpenseByMonthListView = ({ sections }: ExpenseByMonthListViewProps) => {
  const findCategoryById = useCategory(state => state.findCategoryById);
  const subIndex = useSubcatIndex(state => state.index);
  const navigation = useNavigation<RootNav>();

  const handleExpensePress = (expense: ExpenseModel) => {
    navigation.navigate('ExpenseDetails', {
      expenseId: expense.id,
      categoryId: expense.categoryId,
      subCategoryId: expense.subCategoryId ?? undefined,
    });
  };

  const renderItem = ({ item }: { item: ExpenseModel }) => {
    const category = findCategoryById(item.categoryId);

    return (
      <TransactionRow
        text={category?.name}
        amount={item.amount}
        createdAt={item.createdAt}
        subText={
          item.subCategoryId
            ? subIndex[item.categoryId]?.[item.subCategoryId]?.name
            : undefined
        }
        icon={
          category?.icon && IconRegistry[category.icon]
            ? IconRegistry[category.icon]
            : undefined
        }
        onPress={() => handleExpensePress(item)}
      />
    );
  };

  return (
    <SectionList
      sections={sections}
      keyExtractor={(item: ExpenseModel) => item.id}
      stickySectionHeadersEnabled={false}
      renderSectionHeader={({ section }) => (
        <DateTextContainer>
          <DateText>{section.title}</DateText>
        </DateTextContainer>
      )}
      renderItem={renderItem}
      ListHeaderComponent={Separator}
      ItemSeparatorComponent={Separator}
      showsVerticalScrollIndicator={false}
    />
  );
};
export default ExpenseByMonthListView;
