import { FC } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { theme } from '../../theme/theme';

const TopBar: FC = () => {
  return (
    <View style={styles.textContainer}>
      <Text style={styles.textStyle}>חסכוני</Text>
    </View>
  );
};

export default TopBar;

const styles = StyleSheet.create({
  textContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingVertical: 20,
    backgroundColor: 'white',
    elevation: 8,
    shadowColor: theme.color.shadowColor,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    borderRadius: 12,
    paddingStart: 35,
  },
  textStyle: {
    fontFamily: 'PlaypenSansHebrew-bold',
    fontSize: 24,
    marginRight: 10,
    color: theme.color.dark_purple,
  },
});
