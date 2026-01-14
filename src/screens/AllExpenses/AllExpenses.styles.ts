import styled from 'styled-components/native';
import { theme } from '../../theme/theme';

export const Container = styled.View`
  flex: 1;
  margin-horizontal: 18px;
`;

export const HeaderContainer = styled.View`
  align-items: center;
  margin: 30px 0px 5px 0px;
`;

export const Header = styled.Text`
  font-size: 24px;
  font-family: 'MPLUSRounded1c-Medium';
  color: ${theme.color.green};
`;

export const ExpenseByMonthContainer = styled.View`
  flex: 1;
  margin-horizontal: 15px;
`;
