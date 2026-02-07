import styled from 'styled-components/native';
import { theme } from '../../../theme/theme';

export const Container = styled.View`
  flex: 1;
  padding-vertical: 18px;
  margin-horizontal: 35px;
`;

export const PaymentMethodText = styled.Text`
  font-size: 18px;
  font-weight: 500;
  color: ${theme.color.dark_purple};
  font-family: 'MPLUSRounded1c-Medium';
`;

export const Row = styled.Pressable<{ isSelected: boolean }>`
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
