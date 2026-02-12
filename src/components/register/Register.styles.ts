import styled from 'styled-components/native';
import { theme } from '../../theme/theme';

export const Screen = styled.View`
  flex: 1;
  background-color: ${theme.color.white};
`;

export const ScrollContent = styled.View`
  flex: 1;
  padding-horizontal: 24px;
  padding-top: 28px;
`;

export const Header = styled.View`
  z-index: 10;
  align-items: center;
  margin-bottom: 32px;
`;

export const Title = styled.Text`
  font-size: 36px;
  font-family: 'MPLUSRounded1c-Bold';
  text-align: center;
`;

export const Subtitle = styled.Text`
  font-size: 20px;
  font-family: 'MPLUSRounded1c-Medium';
  color: ${theme.color.placeholder};
  text-align: center;
`;

export const Form = styled.View`
  gap: 18px;
`;

export const InputWrapper = styled.View``;

export const LogoContainer = styled.View`
  margin-bottom: 8px;
`;

export const Label = styled.Text`
  font-size: 18px;
  font-family: 'MPLUSRounded1c-Medium';
  color: ${theme.color.dark_purple};
`;

export const StyledInput = styled.TextInput`
  height: 48px;
  border-bottom-width: 1px;
  border-bottom-color: ${theme.color.placeholder};
  font-size: 18px;
  background-color: transparent;
  color: ${theme.color.dark_purple};
  font-family: 'MPLUSRounded1c-Medium';
  margin-bottom: 5px;
`;

export const ErrorText = styled.Text`
  color: red;
  font-size: 16px;
  font-family: 'Assistant';
`;

export const PrimaryButton = styled.Pressable<{ disabled?: boolean }>`
  height: 52px;
  border-radius: 14px;
  background-color: ${({ disabled }) =>
    disabled ? theme.color.placeholder : theme.color.green};
  justify-content: center;
  align-items: center;
  margin-top: 12px;
`;

export const PrimaryButtonText = styled.Text`
  color: ${theme.color.white};
  font-size: 20px;
  font-family: 'Assistant-SemiBold';
`;

export const Footer = styled.View`
  margin-top: 12px;
  align-items: center;
`;

export const FooterRow = styled.View`
  flex-direction: row;
  align-items: center;
  gap: 4px;
`;

export const FooterText = styled.Text`
  font-size: 20px;
  font-family: 'MPLUSRounded1c-Medium';
  color: ${theme.color.dark_purple};
`;

export const LinkText = styled.Text`
  font-size: 20px;
  font-family: 'MPLUSRounded1c-Medium';
  color: ${theme.color.lightBlue};
`;

export const BottomSection = styled.View`
  flex: 1;
  margin-top: auto;
  margin-top: 12px;
`;

export const ButtonWrapper = styled.View``;

export const StyledScrollView = styled.ScrollView.attrs({
  keyboardShouldPersistTaps: 'handled',
  showsVerticalScrollIndicator: false,
  contentContainerStyle: {
    flexGrow: 1,
  },
})``;

export const KeyboardWrapper = styled.KeyboardAvoidingView`
  flex: 1;
  z-index: 10;
`;
