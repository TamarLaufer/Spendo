import React from 'react';
import TransactionRow, {
  TransactionRowProps,
} from '../TransactionRow/TransactionRow';
import { SvgProps } from 'react-native-svg';
import { View } from 'react-native';

type TransactionListProps<T> = {
  data: readonly T[];
  mapItem: (item: T) => TransactionRowProps;
  keyExtractor?: (item: T, index: number) => string;
  icon?: React.ComponentType<SvgProps>;
  amount?: number;
};

const TransactionList = <T,>({
  data,
  mapItem,
  keyExtractor = (_item, index) => String(index),
  icon,
  amount,
}: TransactionListProps<T>) => {
  return (
    <View>
      {data.map((item, index) => {
        const key = keyExtractor(item, index) || String(index);
        const rowProps = mapItem(item);
        return (
          <TransactionRow key={key} {...rowProps} icon={icon} amount={amount} />
        );
      })}
    </View>
  );
};

export default TransactionList;
