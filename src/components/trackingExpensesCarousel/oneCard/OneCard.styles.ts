import styled from 'styled-components/native';
import { CARD_HEIGHT, CARD_WIDTH } from '../../../config/consts';

export const Container = styled.Pressable`
  background-color: white;
  border-radius: 8px;
  margin-horizontal: 8px;
  width: ${CARD_WIDTH}px;
  height: ${CARD_HEIGHT}px;
  padding: 8px;

  /* shadow */
  elevation: 4;
`;
export const TitleContainer = styled.View`
  align-items: center;
  justify-content: center;
  flex-direction: row;
`;
export const Title = styled.Text`
  font-size: 22px;
  font-family: 'MPLUSRounded1c-Medium';
`;
export const AmountText = styled.Text`
  font-size: 18px;
  font-family: 'MPLUSRounded1c-Regular';
  text-align: center;
  margin-top: 5px;
`;
export const MaxAmount = styled.Text`
  font-size: 18px;
  font-family: 'MPLUSRounded1c-Regular';
  margin-top: 5px;
  text-align: center;
`;
export const IconContainer = styled.View`
  padding: 5px;
`;

export const AmountContainer = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: center;
  margin: 5px;
  gap: 5px;
`;
