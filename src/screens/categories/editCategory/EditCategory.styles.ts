import styled from 'styled-components/native';
import { theme } from '../../../theme/theme';

export const Screen = styled.View`
  flex: 1;
  background-color: #f6f7f9;
`;

export const HeaderContainer = styled.View`
  padding: 20px;
`;
export const HeaderText = styled.Text`
  font-size: 24px;
  font-family: 'MPLUSRounded1c-Medium';
`;

export const Footer = styled.View`
  padding: 20px;
`;

export const SaveButton = styled.Pressable`
  padding: 12px;
  border-radius: 8px;
  background-color: ${theme.color.lightBlue};
  align-items: center;
  width: 90%;
  align-self: center;
  font-family: 'MPLUSRounded1c-Bold';
`;

export const SaveText = styled.Text`
  color: white;
  font-size: 20px;
  font-family: 'MPLUSRounded1c-Bold';
`;

export const DeleteButton = styled.Pressable`
  padding: 12px;
  border-radius: 8px;
  background-color: ${theme.color.pink};
  align-items: center;
  width: 90%;
  align-self: center;
  font-family: 'MPLUSRounded1c-Bold';
`;

export const DeleteText = styled.Text`
  color: white;
  font-size: 20px;
  font-family: 'MPLUSRounded1c-Bold';
`;

export const ConfirmationModal = styled.View`
  flex: 1;
  background-color: ${theme.color.white};
  border-radius: 10px;
  padding: 20px;
  gap: 20px;
`;
export const Content = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: ${theme.color.white};
  border-radius: 10px;
  padding: 20px;
  gap: 20px;
`;

export const InputWrapper = styled.View`
  gap: 20px;
`;

export const StyledInput = styled.TextInput`
  padding: 12px;
  border-radius: 8px;
  border: 1px solid ${theme.color.placeholder};
  font-size: 16px;
  font-family: 'MPLUSRounded1c-Regular';
`;
