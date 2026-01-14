import styled from 'styled-components/native';
import { theme } from '../../theme/theme';

export const ListContainer = styled.View`
  padding-horizontal: 20px;
  justify-content: center;
  align-items: center;
`;

export const DateTextContainer = styled.View`
  align-items: center;
  margin-top: 25px;
`;
export const DateText = styled.Text`
  font-size: 17px;
  font-weight: 500;
  color: ${theme.color.lightBlue};
  font-family: 'MPLUSRounded1c-Medium';
`;
export const ExpenseText = styled.Text`
  font-size: 16px;
  font-weight: 500;
  color: ${theme.color.dark_purple};
  font-family: 'MPLUSRounded1c-Regular';
  line-height: 20px;
`;

export const Separator = styled.View`
  height: 1px;
  background-color: rgba(0, 0, 0, 0.1);
`;

export const ListWrapper = styled.View`
  border-left-width: 1px;
  border-right-width: 1px;
  border-bottom-width: 1px;
  border-color: rgba(0, 0, 0, 0.08);
`;
