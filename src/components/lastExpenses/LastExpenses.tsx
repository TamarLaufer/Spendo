import ExpensesListView from '../expensesListView/ExpensesListView';
import { TransactionRowProps } from '../TransactionRow/TransactionRow';

type LastExpensesPropsType = {
  icon: TransactionRowProps['icon'];
};

const LastExpenses = ({ icon }: LastExpensesPropsType) => {
  return <ExpensesListView numOfTransactions header link icon={icon} />;
};

export default LastExpenses;
