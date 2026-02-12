import styled from 'styled-components/native';
import { theme } from '../../theme/theme';

export const Screen = styled.View`
  flex: 1;
  background-color: ${theme.color.white};
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
  z-index: 10;
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
  font-size: 36px;
  font-family: 'MPLUSRounded1c-Bold';
  text-align: center;
`;

export const Subtitle = styled.Text`
  font-size: 20px;
  font-family: 'MPLUSRounded1c-Medium';
  text-align: center;
  margin-top: 8px;
`;

export const Form = styled.View`
  flex: 1;
`;

export const InputWrapper = styled.View``;

export const Label = styled.Text`
  font-size: 17px;
  font-family: 'MPLUSRounded1c-Medium';
  color: ${theme.color.dark_purple};
  margin-bottom: 2px;
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
  margin-bottom: 15px;
`;

export const ButtonWrapper = styled.View``;

export const BottomSection = styled.View`
  margin-top: auto;
  margin-bottom: 36px;
`;

export const PrimaryButton = styled.Pressable<{ disabled?: boolean }>`
  height: 52px;
  width: 92%;
  align-self: center;
  border-radius: 10px;
  background-color: ${({ disabled }) =>
    disabled ? theme.color.lightGray : theme.color.shadowColor};
  justify-content: center;
  align-items: center;
  margin-top: 12px;
`;

export const PrimaryButtonText = styled.Text<{ disabled?: boolean }>`
  color: ${({ disabled }) => (disabled ? theme.color.gray : theme.color.white)};
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
  margin-bottom: 8px;
`;
