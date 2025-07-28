import { FC } from 'react';
import { StyleSheet, Text, View } from 'react-native';
// import { Icons } from '../../assets/icons';

const TopBar: FC = () => {
  // const ArrowDownIcon = Icons.ARROW_DOWN;

  return (
    <View style={styles.textContainer}>
      <Text style={styles.textStyle}>Spendo</Text>
      {/* <ArrowDownIcon width={24} height={24} fill="black" /> */}
    </View>
  );
};

export default TopBar;

const styles = StyleSheet.create({
  textContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    paddingVertical: 20,
    backgroundColor: 'white',
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    borderRadius: 12,
    paddingEnd: 35,
  },
  textStyle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginRight: 10,
  },
});
