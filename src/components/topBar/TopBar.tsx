import { FC } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { theme } from '../../theme/theme';
import { Icons } from '../../assets/icons';
const TopBar: FC = () => {
  return (
    <View style={styles.container}>
      <Icons.Payment width={50} height={50} />
      <Text style={styles.textStyle}>חסכוני</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
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
    fontFamily: 'PlaypenSansHebrew-Regular',
    fontSize: 24,
    marginHorizontal: 6,
    color: theme.color.green,
  },
});

export default TopBar;
