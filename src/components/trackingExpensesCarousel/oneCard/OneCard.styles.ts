import styled from 'styled-components/native';
import { CARD_HEIGHT, CARD_WIDTH } from '../../../config/consts';

export const Container = styled.Pressable`
  background-color: white;
  border-radius: 20px;
  padding: 15px;
  margin-horizontal: 8px;
  width: ${CARD_WIDTH}px;
  height: ${CARD_HEIGHT}px;
  justify-content: flex-start;
  align-items: center;

  /* shadow */
  elevation: 4;
`;
export const TitleContainer = styled.View`
  align-items: center;
  justify-content: center;
  flex-direction: row;
`;
export const Title = styled.Text`
  font-size: 20px;
  font-family: 'MPLUSRounded1c-Regular';
`;
export const MaxAmount = styled.Text`
  font-size: 16px;
  font-family: 'MPLUSRounded1c-Regular';
  margin-top: 5px;
`;
export const IconContainer = styled.View`
  padding: 5px;
`;
