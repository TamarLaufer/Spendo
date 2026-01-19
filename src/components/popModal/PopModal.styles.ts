import styled from 'styled-components/native';
import { theme } from '../../theme/theme';

export const Backdrop = styled.Pressable`
  flex: 1;
  background-color: rgba(0, 0, 0, 0.35);
  align-items: center;
  justify-content: center;
  padding: 24px;
`;

export const ModalView = styled.View`
  justify-content: center;
  margin: 20px;
  background-color: white;
  border-radius: 10px;
  padding: 35px;
  align-items: center;
  width: 335px;
  elevation: 5;
`;

export const ModalText = styled.Text`
  text-align: center;
  font-size: 22px;
  font-family: 'MPLUSRounded1c-Regular';
  margin-bottom: 15px;
`;

export const ButtonsContainer = styled.View`
  flex-direction: row;
  gap: 12px;
  margin-top: 15px;
`;

export const PressRight = styled.Pressable`
  background-color: ${theme.color.lightBlue};
  padding: 8px;
  padding-horizontal: 22px;
  border-radius: 18px;
  justify-content: center;
  align-items: center;
  width: 112px;
  height: 58px;
`;

export const PressLeft = styled.Pressable`
  background-color: ${theme.color.pink};
  padding: 8px;
  border-radius: 18px;
  justify-content: center;
  align-items: center;
  width: 150px;
  height: 58px;
`;

export const ButtonText = styled.Text`
  color: white;
  font-size: 18px;
  font-family: 'MPLUSRounded1c-Regular';
`;
