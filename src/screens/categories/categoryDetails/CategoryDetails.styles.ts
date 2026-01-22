import styled from 'styled-components/native';
import { theme } from '../../../theme/theme';

export const Container = styled.View`
  flex: 1;
  padding: 16px 24px;
`;

export const IconAndHeaderContainer = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

export const HeaderContainer = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  padding-top: 10px;
`;

export const HeaderText = styled.Text`
  font-size: 30px;
  justify-content: center;
  align-items: center;
  font-family: 'MPLUSRounded1c-Bold';
  color: ${theme.color.lightBlue};
`;

export const IconContainer = styled.View`
  align-items: center;
  justify-content: center;
`;

export const SubText = styled.Text`
  font-size: 26px;
  text-align: center;
  font-family: 'MPLUSRounded1c-Bold';
  color: ${theme.color.lightBlue};
`;

export const SubTextContainer = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
`;

export const HeaderSubCatText = styled.Text`
  font-size: 26px;
  text-align: center;
  font-family: 'MPLUSRounded1c-Bold';
`;

export const SubCatText = styled.Text`
  font-size: 16px;
  font-family: 'MPLUSRounded1c-Regular';
`;

export const SubCatList = styled.View`
  flex: 2;
  align-items: center;
  gap: 6px;
`;
