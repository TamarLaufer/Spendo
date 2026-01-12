import styled from 'styled-components/native';
import { theme } from '../../theme/theme';

export const Container = styled.View`
  flex: 1;
  padding-horizontal: 10px;
  justify-content: center;
  align-items: center;
  background-color: ${theme.color.lightGreen};
`;

export const HeaderContainer = styled.View`
  align-items: center;
  margin-vertical: 15px;
`;

export const Header = styled.Text`
  font-size: 24px;
  font-weight: 700;
  font-family: 'MPLUSRounded1c-Regular';
`;
