import styled from 'styled-components/native';
import { theme } from '../../../theme/theme';

export const Container = styled.View`
  flex: 1;
  margin-horizontal: 20px;
`;

export const IconAndHeaderContainer = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: center;
  padding-vertical: 20px;
  gap: 10px;
`;

export const HeaderContainer = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  padding-horizontal: 20px;
`;

export const HeaderText = styled.Text`
  font-size: 34px;
  font-family: 'MPLUSRounded1c-Bold';
  color: ${theme.color.lightBlue};
`;

export const IconContainer = styled.View``;

export const SubText = styled.Text`
  font-size: 22px;
  text-align: left;
  font-family: 'MPLUSRounded1c-Regular';
  padding-vertical: 18px;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  width: 70%;
`;

export const SubTextContainer = styled.View`
  flex-direction: row;
  align-items: center;
  gap: 6px;
`;

export const HeaderSubCatText = styled.Text`
  font-size: 26px;
  text-align: center;
  font-family: 'MPLUSRounded1c-Bold';
`;

export const BoldText = styled.Text`
  font-size: 24px;
  font-family: 'MPLUSRounded1c-Bold';
`;

export const SubCategoriesListContainer = styled.View`
  flex: 1;
  margin-bottom: 20px;
`;
