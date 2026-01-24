import styled from 'styled-components/native';

export const Container = styled.View<{ hasNoSubCategories: boolean }>`
  flex: 1;
  background-color: white;
  padding: 20px 24px;
  border-radius: 8px;
  elevation: ${({ hasNoSubCategories }) => (hasNoSubCategories ? 0 : 8)};
`;

export const HeaderContainer = styled.View`
  margin-bottom: 10px;
`;

export const Header = styled.Text`
  font-size: 24px;
  font-family: 'MPLUSRounded1c-Medium';
  text-align: center;
`;

export const SubCatText = styled.Text`
  font-size: 20px;
  font-family: 'MPLUSRounded1c-Regular';
  text-align: center;
  margin-vertical: 10px;
`;
