import styled from 'styled-components/native';
import { theme } from '../../theme/theme';

export const Container = styled.View`
  padding: 16px;
  gap: 10px;
`;

export const Label = styled.Text`
  font-size: 14px;
  font-weight: 600;
`;

export const Input = styled.TextInput`
  border-width: 1px;
  border-color: #ddd;
  border-radius: 10px;
  padding: 10px;
`;

export const AddButton = styled.Pressable<{ disabled: boolean }>`
  margin-top: 12px;
  background-color: ${({ disabled }) =>
    disabled ? theme.color.lightGreen : theme.color.lightBlue};
  padding: 14px;
  border-radius: 12px;
  align-items: center;
  opacity: ${({ disabled }) => (disabled ? 0.5 : 1)};
`;

export const AddButtonText = styled.Text`
  color: white;
  font-size: 18px;
  font-weight: 700;
`;

export const ErrorText = styled.Text`
  color: red;
`;

export const CloseText = styled.Text`
  text-align: right;
  padding-right: 20px;
  font-size: 20px;
`;

export const CloseButtonContainer = styled.Pressable`
  align-items: flex-end;
`;
