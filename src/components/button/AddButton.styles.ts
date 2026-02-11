import styled from 'styled-components/native';
import { theme } from '../../theme/theme';

export const Container = styled.Pressable`
  position: absolute;
  bottom: 30px;
  width: 72px;
  height: 72px;
  border-radius: 50px;
  background-color: ${theme.color.lightBlue};
  justify-content: center;
  align-items: center;
  elevation: 10;
  margin-left: 4px;
`;

export const Plus = styled.Text`
  font-size: 45px;
  color: white;
  margin-top: -2px;
`;
