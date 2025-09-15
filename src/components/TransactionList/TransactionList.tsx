import React from 'react';
import TransactionRow, {
  TransactionRowProps,
} from '../TransactionRow/TransactionRow';
import { SvgProps } from 'react-native-svg';

type TransactionListProps<T> = {
  data: readonly T[];
  mapItem: (item: T) => TransactionRowProps;
  keyExtractor?: (item: T) => string;
  icon?: React.ComponentType<SvgProps>;
  amount?: number;
};

const TransactionList = <T,>({
  data,
  mapItem,
  keyExtractor,
  icon,
  amount,
}: TransactionListProps<T>) => {
  return (
    <>
      {data.map((item, index) => {
        const rowProps = mapItem(item);
        const key = keyExtractor ? keyExtractor(item) : String(index);
        return (
          <TransactionRow key={key} {...rowProps} icon={icon} amount={amount} />
        );
      })}
    </>
  );
};

export default TransactionList;
