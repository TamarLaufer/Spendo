import React from 'react';
import TransactionRow, {
  TransactionRowProps,
} from '../transactionRow/TransactionRow';
import { View } from 'react-native';

type TransactionListProps<T> = {
  data: readonly T[];
  mapItem: (item: T) => TransactionRowProps;
  keyExtractor?: (item: T, index: number) => string;
  icon?: TransactionRowProps['icon'];
};

const TransactionList = <T,>({
  data,
  mapItem,
  keyExtractor = (_item, index) => String(index),
  icon,
}: TransactionListProps<T>) => {
  return (
    <View>
      {data.map((item, index) => {
        const key = keyExtractor(item, index) || String(index);
        const rowProps = mapItem(item);
        return (
          <TransactionRow
            key={key}
            {...rowProps}
            icon={rowProps.icon ?? icon}
          />
        );
      })}
    </View>
  );
};

export default TransactionList;
