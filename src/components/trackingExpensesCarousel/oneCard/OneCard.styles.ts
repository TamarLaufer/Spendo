import styled from 'styled-components/native';
import { theme } from '../../../theme/theme';
import { CARD_WIDTH } from '../../../config/consts';
import { LinearGradient } from 'react-native-linear-gradient';

export const Container = styled(LinearGradient)`
  background-color: ${theme.color.green};
  border-radius: 20px;
  padding: 20px;
  margin-horizontal: 8px;
  width: ${CARD_WIDTH}px;
  height: 150px;
  justify-content: flex-start;
  align-items: center;
`;
export const TitleContainer = styled.View`
  align-items: center;
  justify-content: center;
  flex-direction: row;
`;
export const Title = styled.Text`
  font-size: 20px;
  font-wheight: bold;
  font-family: 'MPLUSRounded1c-Regular';
`;
export const MaxAmount = styled.Text`
  font-size: 16px;
  font-wheight: bold;
  font-family: 'MPLUSRounded1c-Regular';
  margin-top: 5px;
`;
export const IconContainer = styled.View`
  padding: 5px;
`;
