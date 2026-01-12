import styled from 'styled-components/native';
import { theme } from '../../theme/theme';

export const ListContainer = styled.View``;
export const OneRowContainer = styled.View`
  padding-horizontal: 20px;
  justify-content: center;
  align-items: center;
  flex-direction: row;
  background-color: ${theme.color.lightGreen};
  border-width: 0.5px;
  border-color: ${theme.color.shadowColor};
  flex-wrap: wrap;
`;

export const DateTextContainer = styled.View`
  align-items: center;
  padding-vertical: 10px;
`;
export const DateText = styled.Text`
  font-size: 16px;
  font-weight: 500;
  color: ${theme.color.dark_purple};
  font-family: 'MPLUSRounded1c-Regular';
`;
export const ExpenseText = styled.Text`
  font-size: 16px;
  font-weight: 500;
  color: ${theme.color.dark_purple};
  font-family: 'MPLUSRounded1c-Regular';
  line-height: 20px;
`;
