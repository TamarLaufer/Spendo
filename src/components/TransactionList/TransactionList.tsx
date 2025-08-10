import React from 'react';
import TransactionRow, {
  TransactionRowProps,
} from '../TransactionRow/TransactionRow';

type TransactionListProps<T> = {
  data: readonly T[];
  mapItem: (item: T, index: number) => TransactionRowProps;
  keyExtractor?: (item: T, index: number) => string;
};

const TransactionList = <T,>({
  data,
  mapItem,
  keyExtractor,
}: TransactionListProps<T>) => {
  return (
    <>
      {data.map((item, index) => {
        const rowProps = mapItem(item, index);
        const key = keyExtractor ? keyExtractor(item, index) : String(index);
        return <TransactionRow key={key} {...rowProps} />;
      })}
    </>
  );
};

export default TransactionList;
