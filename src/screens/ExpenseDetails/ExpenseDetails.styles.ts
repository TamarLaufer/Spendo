import styled from 'styled-components/native';
import { theme } from '../../theme/theme';

export const Container = styled.View`
  flex: 1;
`;

export const LogoContainer = styled.View`
  flex: 0.5;
  justify-content: center;
  align-items: center;
`;

export const TextContainer = styled.View`
  flex: 1;
  align-items: center;
  justify-content: flex-start;
  gap: 10px;
  margin-bottom: 40px;
`;

export const TextBase = styled.Text`
  font-size: 20px;
  font-family: 'MPLUSRounded1c-Regular';
  color: white;
`;

export const DetailText = styled.Text`
  font-size: 26px;
  font-family: 'MPLUSRounded1c-Regular';
  margin-vertical: 10px;
`;

export const Elements = styled.View`
  justify-content: center;
  align-items: center;
  flex-direction: row;
  gap: 17px;
  padding-bottom: 20px;
  margin-bottom: 25px;
`;

export const DeleteContainer = styled.Pressable`
  background-color: ${theme.color.pink};
  border-radius: 10px;
  justify-content: center;
  align-items: center;
  padding-horizontal: 20px;
  padding-vertical: 10px;
`;

export const EditContainer = styled.Pressable`
  background-color: ${theme.color.lightBlue};
  border-radius: 10px;
  justify-content: center;
  align-items: center;
  padding-horizontal: 20px;
  padding-vertical: 10px;
`;

export const AmountText = styled.Text`
  font-size: 32px;
  font-family: 'MPLUSRounded1c-Bold';
  margin-vertical: 10px;
`;

export const BoldText = styled.Text`
  font-size: 28px;
  font-family: 'MPLUSRounded1c-Bold';
  margin-vertical: 10px;
`;

export const DeleteButtonText = styled.Text`
  font-size: 16px;
  font-family: 'MPLUSRounded1c-Bold';
  color: white;
`;

export const EditButtonText = styled.Text`
  font-size: 16px;
  font-family: 'MPLUSRounded1c-Bold';
  color: white;
`;
