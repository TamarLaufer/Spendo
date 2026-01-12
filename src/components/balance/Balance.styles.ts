import styled from 'styled-components/native';
import { theme } from '../../theme/theme';

export const Container = styled.View`
  align-items: center;
  justify-content: center;
  padding: 20px;
  background-color: ${theme.color.lightGreen};
  margin: 0 30px;
`;
export const HeaderText = styled.Text`
  font-size: 24px;
  font-family: MPLUSRounded1c-Bold;
`;
export const RegularText = styled.Text`
  font-size: 22px;
  font-family: MPLUSRounded1c-Regular;
`;
export const BalanceAmount = styled.Text`
  padding-top: 10px;
  font-size: 36px;
  font-family: MPLUSRounded1c-Regular;
`;
