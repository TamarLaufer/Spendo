import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import { theme } from '../../../theme/theme';

type ContinueButtonType = {
  onPress: () => void;
  title: string;
  disabled: boolean;
};

const ContinueButton = ({ onPress, disabled, title }: ContinueButtonType) => {
  return (
    <TouchableOpacity
      style={[
        styles.continueButton,
        { backgroundColor: theme.color.dark_purple },
      ]}
      onPress={onPress}
      disabled={disabled}
    >
      <Text style={styles.continueText}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  continueButton: {
    height: 58,
    borderRadius: 32,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 40,
    elevation: 1,
  },
  continueText: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
    letterSpacing: 1,
  },
});

export default ContinueButton;
