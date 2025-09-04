import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TouchableOpacity,
} from 'react-native';
import { theme } from '../../../theme/theme';

type ContinueButtonType = {
  onPress: () => void;
  title: string;
  disabled: boolean;
  loading?: boolean;
};

const ContinueButton = ({
  onPress,
  disabled,
  title,
  loading,
}: ContinueButtonType) => {
  return (
    <TouchableOpacity
      style={[
        styles.continueButton,
        { backgroundColor: theme.color.whiteBlue },
      ]}
      onPress={onPress}
      disabled={disabled || loading}
    >
      {loading ? (
        <ActivityIndicator />
      ) : (
        <Text style={styles.continueText}>{title}</Text>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  continueButton: {
    height: 58,
    borderRadius: 14,
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
    fontFamily: 'Fredoka-Regular',
  },
});

export default ContinueButton;
