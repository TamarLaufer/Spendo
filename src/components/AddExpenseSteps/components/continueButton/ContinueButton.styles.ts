import styled from 'styled-components/native';
import { theme } from '../../../../theme/theme';

export const ContinueButtonContainer = styled.Pressable<{
  disabled?: boolean;
}>`
  height: 58px;
  border-radius: 14px;
  justify-content: center;
  align-items: center;
  margin-horizontal: 40px;
  elevation: 1;
  opacity: ${({ disabled }) => (disabled ? 0.5 : 1)};
  background-color: ${theme.color.lightBlue};
`;

export const ContinueButtonText = styled.Text`
  color: white;
  font-size: 24px;
  font-weight: bold;
  letter-spacing: 1px;
  font-family: Fredoka-Regular;
`;
