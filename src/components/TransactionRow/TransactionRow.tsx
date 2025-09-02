import {
  Pressable,
  StyleProp,
  StyleSheet,
  Text,
  TextStyle,
  ViewStyle,
} from 'react-native';

export type TransactionRowProps = {
  text: string;
  onPress: () => void;
  containerStyle?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
};

const TransactionRow = ({
  text,
  onPress,
  containerStyle,
  textStyle,
}: TransactionRowProps) => (
  <Pressable style={containerStyle ?? styles.container} onPress={onPress}>
    <Text style={textStyle ?? styles.text}>{text}</Text>
  </Pressable>
);

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 15,
    elevation: 2,
    borderWidth: 2,
    borderColor: 'transparent',
    marginVertical: 5,
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
