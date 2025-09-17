import {
  Pressable,
  StyleProp,
  StyleSheet,
  Text,
  TextStyle,
  View,
} from 'react-native';
import { SvgProps } from 'react-native-svg';
import { formatAmount, formatShortDate } from '../../functions/functions';

export type TransactionRowProps = {
  text: string;
  onPress: () => void;
  textStyle?: StyleProp<TextStyle>;
  icon?: React.ComponentType<SvgProps>;
  iconSize?: number;
  amount?: number;
  createdAt?: Date | null;
  subText?: string;
};

const TransactionRow = ({
  text,
  onPress,
  textStyle,
  icon: Icon,
  iconSize = 30,
  amount,
  createdAt,
  subText,
}: TransactionRowProps) => (
  <Pressable style={styles.container} onPress={onPress}>
    <View style={[styles.colBase, styles.rightContainer]}>
      {Icon ? <Icon width={iconSize} height={iconSize} /> : null}
    </View>

    <View style={[styles.colBase, styles.middleContainer]}>
      <Text style={textStyle ?? styles.text} numberOfLines={1}>
        {text}
      </Text>
      {subText ? (
        <Text style={styles.subText} numberOfLines={1}>
          {subText}
        </Text>
      ) : null}
    </View>

    <View style={[styles.colBase, styles.leftContainer]}>
      {typeof amount === 'number' ? (
        <Text style={styles.textAmount}>{formatAmount(amount)}</Text>
      ) : null}
      {createdAt ? (
        <Text style={styles.dateText}>{formatShortDate(createdAt)}</Text>
      ) : null}
    </View>
  </Pressable>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    borderRadius: 15,
    elevation: 1.2,
    borderWidth: 2,
    borderColor: 'transparent',
    marginVertical: 5,
    flexDirection: 'row',
    paddingHorizontal: 20,
    alignItems: 'center',
    paddingVertical: 10,
    justifyContent: 'center',
  },
  colBase: {
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 0,
    minWidth: 0,
    flexDirection: 'column',
    justifyContent: 'center',
  },
  rightContainer: {
    // backgroundColor: 'yellow',
    alignItems: 'center',
  },
  middleContainer: {
    // backgroundColor: 'red',
    alignItems: 'flex-start',
    gap: 5,
  },
  leftContainer: {
    // backgroundColor: 'green',
    alignItems: 'flex-end',
    gap: 5,
  },
  subText: {
    color: '#666',
  },
  text: {
    fontSize: 20,
  },
  textAmount: {
    fontSize: 18,
  },
  dateText: {
    color: '#666',
  },
});

export default TransactionRow;
