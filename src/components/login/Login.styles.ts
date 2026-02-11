import styled from 'styled-components/native';
import { theme } from '../../theme/theme';

export const Screen = styled.View`
  flex: 1;
`;

export const StyledScrollView = styled.ScrollView.attrs({
  keyboardShouldPersistTaps: 'handled',
  showsVerticalScrollIndicator: false,
  contentContainerStyle: {
    flexGrow: 1,
  },
})``;

export const KeyboardWrapper = styled.KeyboardAvoidingView`
  flex: 1;
`;

export const TitlesContainer = styled.View`
  flex-direction: column;
  align-items: center;
`;

export const ScrollContent = styled.View`
  flex: 1;
  padding-horizontal: 24px;
  padding-top: 48px;
`;

export const Header = styled.View`
  z-index: 10;
  align-items: center;
  margin-bottom: 52px;
`;

export const Title = styled.Text`
  font-size: 30px;
  font-family: 'MPLUSRounded1c-Bold';
  text-align: center;
  z-index: 10;
`;

export const Subtitle = styled.Text`
  font-size: 18px;
  font-family: 'MPLUSRounded1c-Regular';
  text-align: center;
  margin-top: 8px;
  z-index: 10;
`;

export const Form = styled.View`
  flex: 1;
`;

export const InputWrapper = styled.View``;

export const Label = styled.Text`
  font-size: 16px;
  font-family: 'MPLUSRounded1c-Medium';
  color: ${theme.color.dark_purple};
  margin-bottom: 4px;
`;

export const StyledInput = styled.TextInput`
  height: 52px;
  border-width: 1px;
  border-color: ${theme.color.placeholder};
  border-radius: 14px;
  padding-horizontal: 16px;
  font-size: 18px;
  background-color: ${theme.color.white};
  color: ${theme.color.dark_purple};
  font-family: 'MPLUSRounded1c-Medium';
  margin-bottom: 18px;
`;

export const ErrorText = styled.Text`
  color: red;
  font-size: 12px;
  font-family: 'Assistant';
`;

export const ButtonWrapper = styled.View``;

export const BottomSection = styled.View`
  margin-top: auto;
  margin-bottom: 36px;
`;

export const PrimaryButton = styled.Pressable<{ disabled?: boolean }>`
  height: 52px;
  border-radius: 14px;
  background-color: ${({ disabled }) =>
    disabled ? theme.color.placeholder : theme.color.lightBlue};
  justify-content: center;
  align-items: center;
`;

export const PrimaryButtonText = styled.Text`
  color: ${theme.color.white};
  font-size: 20px;
  font-family: 'MPLUSRounded1c-Medium';
`;

export const Footer = styled.View`
  margin-top: 14px;
  align-items: center;
`;

export const FooterRow = styled.View``;

export const LinkText = styled.Text`
  font-size: 18px;
  font-family: 'MPLUSRounded1c-Medium';
  color: ${theme.color.white};
`;

export const LogoContainer = styled.View`
  margin-bottom: 18px;
`;
