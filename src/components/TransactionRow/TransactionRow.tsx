import {
  Pressable,
  StyleProp,
  StyleSheet,
  Text,
  TextStyle,
  ViewStyle,
} from 'react-native';
import { SvgProps } from 'react-native-svg';
import { formatAmount } from '../../functions/functions';

export type TransactionRowProps = {
  text: string;
  onPress: () => void;
  containerStyle?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
  icon?: React.ComponentType<SvgProps>;
  iconSize?: number;
  amount?: number;
};

const TransactionRow = ({
  text,
  onPress,
  containerStyle,
  textStyle,
  icon: Icon,
  iconSize = 30,
  amount,
}: TransactionRowProps) => (
  <Pressable style={containerStyle ?? styles.container} onPress={onPress}>
    {Icon && <Icon width={iconSize} height={iconSize} />}
    <Text style={textStyle ?? styles.text}>{text}</Text>
    {amount && <Text>{formatAmount(amount)}</Text>}
  </Pressable>
);

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderRadius: 15,
    elevation: 1.2,
    borderWidth: 2,
    borderColor: 'transparent',
    marginVertical: 5,
    flexDirection: 'row',
    paddingHorizontal: 20,
  },
  text: {
    height: 60,
    fontSize: 20,
    textAlign: 'center',
    verticalAlign: 'middle',
    color: '#333',
  },
});
export default TransactionRow;
