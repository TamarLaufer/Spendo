import styled from 'styled-components/native';
import { theme } from '../../../theme/theme';

export const Container = styled.View`
  flex: 1;
  padding-vertical: 18px;
  margin-horizontal: 35px;
`;

export const Msg = styled.Text`
  text-align: center;
  margin-top: 20px;
  font-size: 16px;
`;
export const Loader = styled.View`
  margin-top: 20px;
`;
export const Error = styled.Text`
  text-align: center;
  margin-top: 20px;
  font-size: 16px;
  color: red;
`;
export const Row = styled.Pressable<{ isSelected?: boolean }>`
  padding: 14px;
  border-radius: 12px;
  background-color: white;
  margin-bottom: 8px;

  ${({ isSelected }) =>
    isSelected &&
    `
    border-width: 1px;
    border-color: ${theme.color.placeholder};
  `}
`;
export const RowText = styled.Text`
  font-size: 18px;
  margin-left: 12px;
  font-family: 'MPLUSRounded1c-Medium';
`;
