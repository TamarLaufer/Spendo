import styled from 'styled-components/native';
import { theme } from '../../../theme/theme';

export const Container = styled.View`
  flex: 1;
  margin-horizontal: 35px;
  padding-vertical: 48px;
`;

export const StyledInput = styled.TextInput`
  min-height: 190px;
  padding: 12px;
  font-size: 18px;
  border-width: 1px;
  border-color: ${theme.color.placeholder};
  border-radius: 8px;

  color: ${theme.color.dark_purple};
  font-family: 'MPLUSRounded1c-Medium';
`;
