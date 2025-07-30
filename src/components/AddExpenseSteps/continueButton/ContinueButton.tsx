import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import { STRINGS } from '../../../strings/hebrew';
import { theme } from '../../../theme/theme';

type ContinueButtonType = {
  onPress: () => void;
  disabled: boolean;
};

const ContinueButton = ({ onPress, disabled }: ContinueButtonType) => {
  return (
    <TouchableOpacity
      style={[styles.continueButton, { backgroundColor: theme.color.purple }]}
      onPress={onPress}
      disabled={disabled}
    >
      <Text style={styles.continueText}>{STRINGS.CONTINUE_BUTTON_TEXT}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  continueButton: {
    flex: 1,
    height: 56,
    borderRadius: 32,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 8,
    elevation: 1,
  },
  continueText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    letterSpacing: 1,
  },
});

export default ContinueButton;
