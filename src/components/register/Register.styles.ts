import styled from 'styled-components/native';
import { theme } from '../../theme/theme';

export const Screen = styled.View`
  flex: 1;
  background-color: #f6f7f9;
`;

export const ScrollContent = styled.View`
  flex: 1;
  padding-horizontal: 24px;
  padding-top: 48px;
`;

export const Header = styled.View`
  margin-bottom: 32px;
`;

export const Title = styled.Text`
  font-size: 28px;
  font-family: 'Assistant-Bold';
  color: ${theme.color.dark_purple};
  text-align: center;
`;

export const Subtitle = styled.Text`
  font-size: 16px;
  font-family: 'Assistant';
  color: ${theme.color.placeholder};
  text-align: center;
  margin-top: 8px;
`;

export const Form = styled.View`
  gap: 20px;
`;

export const InputWrapper = styled.View`
  gap: 6px;
`;

export const Label = styled.Text`
  font-size: 14px;
  font-family: 'Assistant-SemiBold';
  color: ${theme.color.dark_purple};
`;

export const StyledInput = styled.TextInput`
  height: 52px;
  border-width: 1px;
  border-color: ${theme.color.placeholder};
  border-radius: 14px;
  padding-horizontal: 16px;
  font-size: 17px;
  background-color: ${theme.color.white};
  color: ${theme.color.dark_purple};
  font-family: 'Assistant';
`;

export const ErrorText = styled.Text`
  color: red;
  font-size: 12px;
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
  font-size: 18px;
  font-family: 'Assistant-SemiBold';
`;

export const Footer = styled.View`
  margin-top: 24px;
  align-items: center;
`;

export const FooterRow = styled.View`
  flex-direction: row;
  align-items: center;
  gap: 4px;
`;

export const FooterText = styled.Text`
  font-size: 15px;
  font-family: 'Assistant';
  color: ${theme.color.dark_purple};
`;

export const LinkText = styled.Text`
  font-size: 15px;
  font-family: 'Assistant-SemiBold';
  color: ${theme.color.green};
`;
