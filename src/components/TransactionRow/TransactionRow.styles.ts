import styled from 'styled-components/native';
import { theme } from '../../theme/theme';

export const Container = styled.Pressable`
  background-color: white;
  flex-direction: row;
  padding-horizontal: 10px;
  padding-vertical: 10px;
  align-items: center;
`;
export const IconContainer = styled.View`
  width: 36px;
  align-items: center;
  justify-content: center;
  margin-end: 8px;
`;
export const RightCol = styled.View`
  align-items: center;
  justify-content: center;
  margin-end: 8px;
`;
export const MiddleCol = styled.View`
  flex: 1;
  justify-content: center;
`;
export const LeftCol = styled.View`
  margin-start: 8px;
  align-items: flex-end;
  justify-content: center;
`;
export const Title = styled.Text`
  font-size: 18px;
  color: ${theme.color.dark_purple};
  font-family: 'MPLUSRounded1c-Regular';
`;
export const SubTitle = styled.Text`
  font-size: 14px;
  color: ${theme.color.dark_purple};
  font-family: 'MPLUSRounded1c-Regular';
`;
export const Amount = styled.Text`
  font-size: 16px;
  color: ${theme.color.dark_purple};
  font-family: 'MPLUSRounded1c-Regular';
`;
export const Date = styled.Text`
  font-size: 12px;
  color: ${theme.color.dark_purple};
  font-family: 'MPLUSRounded1c-Regular';
`;
