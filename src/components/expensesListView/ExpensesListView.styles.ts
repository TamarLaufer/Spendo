import styled from 'styled-components/native';
import { theme } from '../../theme/theme';

export const Separator = styled.View`
  height: 1px;
  background-color: rgba(0, 0, 0, 0.1);
`;

export const ContentContainer = styled.View`
  margin-horizontal: 20px;
  margin-bottom: 25px;
`;

export const HeaderContainer = styled.View`
  align-items: center;
  margin: 4px;
`;

export const HeaderText = styled.Text`
  font-family: 'MPLUSRounded1c-Regular';
  font-size: 22px;
  padding-bottom: 5px;
`;

export const NoExpensesText = styled.Text`
  font-family: 'Assistant';
  font-size: 18px;
`;

export const LinkPressable = styled.Pressable`
  align-items: flex-end;
  padding-end: 10px;
  margin-top: 10px;
`;

export const LinkText = styled.Text`
  font-size: 18px;
  color: ${theme.color.lightBlue};
  font-family: 'MPLUSRounded1c-Regular';
`;

export const ListWrapper = styled.View`
  border-left-width: 1px;
  border-right-width: 1px;
  border-bottom-width: 1px;
  border-color: rgba(0, 0, 0, 0.08);
`;
