import styled from 'styled-components/native';
import { theme } from '../../../theme/theme';

export const Container = styled.View`
  padding-horizontal: 10px,
  padding-bottom: 40px,
`;

export const Header = styled.Text`
  font-size: 23px;
  font-weight: 700;
`;

export const HeaderContainer = styled.View`
  align-items: center;
  justify-content: center;
  padding-vertical: 15px;
`;

export const Row = styled.Pressable`
  padding: 14px;
  border-radius: 12px;
  background-color: white;
  margin-bottom: 8px;
`;

export const RowText = styled.Text`
  font-size: 18px;
`;

export const AddCategoryButton = styled.Pressable`
  margin-top: 12px;
  background-color: ${theme.color.lightBlue};
  padding: 14px;
  border-radius: 12px;
  align-items: center;
`;
export const ButtonText = styled.Text`
  color: white;
  font-size: 18px;
  font-weight: 700;
`;
