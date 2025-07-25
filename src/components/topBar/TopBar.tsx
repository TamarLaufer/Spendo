import { FC } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Icons } from '../../assets/icons';

const TopBar: FC = () => {
  const ArrowDownIcon = Icons.ARROW_DOWN;

  return (
    <View style={styles.textContainer}>
      <Text style={styles.textStyle}>Spendo</Text>
      <ArrowDownIcon width={24} height={24} fill="black" />
    </View>
  );
};

export default TopBar;

const styles = StyleSheet.create({
  textContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 20,
    backgroundColor: 'yellow',
  },
  textStyle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginRight: 10,
  },
});
