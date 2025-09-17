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
    {/* טור ימני – אייקון (רוחב קבוע) */}
    <View style={styles.rightCol}>
      {Icon ? <Icon width={iconSize} height={iconSize} /> : null}
    </View>

    {/* טור אמצעי – כותרת + תת-כותרת (גמיש) */}
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

    {/* טור שמאלי – סכום ותאריך (מותאם-תוכן) */}
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
    borderRadius: 15,
    elevation: 1.2,
    borderWidth: 2,
    borderColor: 'transparent',
    marginVertical: 5,
    paddingHorizontal: 16,
    paddingVertical: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  rightCol: {
    width: 36,
    alignItems: 'center',
    justifyContent: 'center',
    marginEnd: 8,
  },
  middleCol: {
    flex: 1,
    minWidth: 0,
    justifyContent: 'center',
    gap: 4,
  },
  leftCol: {
    marginStart: 8,
    alignItems: 'flex-end',
    justifyContent: 'center',
  },

  //
  title: { fontSize: 18, color: '#222' },
  subTitle: { fontSize: 14, color: '#666' },
  amount: { fontSize: 16, color: '#222' },
  date: { fontSize: 12, color: '#666' },
});

export default TransactionRow;
