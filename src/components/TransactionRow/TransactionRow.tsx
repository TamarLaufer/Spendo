import { Pressable, StyleSheet, Text } from 'react-native';

export type TransactionRowProps = {
  text: string;
  onPress: () => void;
};

const TransactionRow = ({ text, onPress }: TransactionRowProps) => (
  <Pressable style={styles.container} onPress={onPress}>
    <Text style={styles.text}>{text}</Text>
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
    fontSize: 23,
    textAlign: 'center',
    verticalAlign: 'middle',
    color: '#333',
  },
});
export default TransactionRow;
