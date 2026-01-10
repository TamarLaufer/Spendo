import {
  Pressable,
  StyleProp,
  StyleSheet,
  Text,
  TextStyle,
  View,
} from 'react-native';
import { SvgProps } from 'react-native-svg';
import { formatAmount, formatShortDate } from '../../utils/formatting';
import { theme } from '../../theme/theme';

export type TransactionRowProps = {
  text: string;
  onPress?: () => void;
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
  <Pressable style={styles.container} onPress={onPress} disabled={!onPress}>
    <View style={styles.rightCol}>
      {Icon ? <Icon width={iconSize} height={iconSize} /> : null}
    </View>
    <View style={styles.middleCol}>
      <Text style={[styles.title, textStyle]} numberOfLines={1}>
        {text}
      </Text>
      {subText ? (
        <Text style={styles.subTitle} numberOfLines={1}>
          {subText}
        </Text>
      ) : null}
    </View>
    <View style={styles.leftCol}>
      {typeof amount === 'number' ? (
        <Text style={styles.amount} numberOfLines={1}>
          {formatAmount(amount)}
        </Text>
      ) : null}
      {createdAt ? (
        <Text style={styles.date} numberOfLines={1}>
          {formatShortDate(createdAt)}
        </Text>
      ) : null}
    </View>
  </Pressable>
);

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flexDirection: 'row',
    elevation: 12,
    borderWidth: 0.5,
    borderColor: theme.color.shadowColor,
    paddingHorizontal: 10,
    paddingVertical: 10,
    alignItems: 'center',
    marginVertical: 0.2,
  },
  rightCol: {
    width: 36,
    alignItems: 'center',
    justifyContent: 'center',
    marginEnd: 8,
  },
  middleCol: {
    flex: 1,
    justifyContent: 'center',
  },
  leftCol: {
    marginStart: 8,
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
  title: { fontSize: 18, color: '#222', fontFamily: 'MPLUSRounded1c-Regular' },
  subTitle: {
    fontSize: 14,
    color: '#666',
    fontFamily: 'MPLUSRounded1c-Regular',
  },
  amount: { fontSize: 16, color: '#222', fontFamily: 'MPLUSRounded1c-Regular' },
  date: { fontSize: 12, color: '#666', fontFamily: 'MPLUSRounded1c-Regular' },
});

export default TransactionRow;
