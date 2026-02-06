import { ActivityIndicator } from 'react-native';
import {
  ContinueButtonContainer,
  ContinueButtonText,
} from './ContinueButton.styles';

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
    <ContinueButtonContainer onPress={onPress} disabled={disabled || loading}>
      {loading ? (
        <ActivityIndicator />
      ) : (
        <ContinueButtonText>{title}</ContinueButtonText>
      )}
    </ContinueButtonContainer>
  );
};

export default ContinueButton;
