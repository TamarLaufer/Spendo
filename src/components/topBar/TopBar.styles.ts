import styled from 'styled-components/native';
import { theme } from '../../theme/theme';

export const Container = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  padding-vertical: 10px;
  padding-left: 30px;
  background-color: white;
  elevation: 4;
`;

export const TitleText = styled.Text`
  font-family: 'MPLUSRounded1c-Regular';
  font-size: 24px;
  margin-horizontal: 6px;
  color: ${theme.color.green};
`;
