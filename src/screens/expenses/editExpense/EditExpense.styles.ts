import styled, { css } from 'styled-components/native';
import { theme } from '../../../theme/theme';

export const Screen = styled.View`
  flex: 1;
  background-color: #f6f7f9;
`;

export const HeaderContainer = styled.View`
  height: 80px;
  justify-content: center;
  align-items: center;
`;

export const HeaderText = styled.Text`
  font-size: 28px;
  font-family: 'MPLUSRounded1c-Bold';
`;

export const Content = styled.View`
  flex: 1;
  padding: 20px;
  gap: 20px;
  background-color: white;
  margin: 16px;
  border-radius: 24px;
  elevation: 4;
`;

export const InputWrapper = styled.View`
  gap: 6px;
`;

export const StyledInput = styled.TextInput`
  height: 52px;
  border: 1px solid #e5e7eb;
  border-radius: 14px;
  padding: 14px;
  font-size: 17px;
  background-color: #fafafa;
  font-family: 'MPLUSRounded1c-Medium';
`;

export const ErrorText = styled.Text`
  color: red;
  font-size: 12px;
  font-family: 'MPLUSRounded1c-Regular';
`;

export const ChangeCategoryButton = styled.Pressable`
  padding: 14px;
  border-radius: 14px;
  border: 1px dashed #c7c7cc;
  align-items: center;
  background-color: transparent;
`;

export const ChangeCategoryText = styled.Text`
  font-size: 18px;
  color: #3a3a3c;
  font-family: 'MPLUSRounded1c-Regular';
`;

export const Footer = styled.View`
  padding: 20px;
`;

export const SaveButton = styled.Pressable<{ disabled?: boolean }>`
  padding: 12px;
  border-radius: 8px;
  background-color: ${({ disabled }) =>
    disabled ? '#c7c7cc' : theme.color.lightBlue};
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

export const SheetRow = styled.Pressable<{ isSelected?: boolean }>`
  ${({ isSelected }) =>
    isSelected &&
    css`
      border-width: 2px;
      border-color: #4da6ff;
    `}
  flex-direction: row;
  align-items: center;
  padding: 16px;
  border-radius: 12px;
  background-color: white;
  margin-bottom: 8px;
`;

export const SelectedRow = styled(SheetRow)`
  border-width: 2px;
  border-color: #4da6ff;
`;

export const SheetRowText = styled.Text`
  font-size: 18px;
  margin-start: 12px;
`;
