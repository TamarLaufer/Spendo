import styled from 'styled-components/native';
import { theme } from '../../../theme/theme';

export const Container = styled.View`
  flex: 1;
  padding-horizontal: 10px;
  padding-bottom: 40px;
`;

export const Header = styled.Text`
  font-size: 28px;
  font-family: 'MPLUSRounded1c-Bold';
  color: ${theme.color.lightBlue};
`;

export const HeaderContainer = styled.View`
  align-items: center;
  justify-content: center;
  padding-vertical: 15px;
`;

export const Row = styled.Pressable<{ disabled?: boolean }>`
  padding: 14px;
  border-radius: 12px;
  background-color: white;
  flex-direction: row;
  align-items: center;
  opacity: ${({ disabled }) => (disabled ? 0.5 : 1)};
  background-color: ${({ disabled }) =>
    disabled ? theme.color.lightGray : 'white'};
`;

export const RowText = styled.Text`
  font-size: 18px;
  font-family: 'MPLUSRounded1c-Bold';
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
  font-size: 20px;
  font-family: 'MPLUSRounded1c-Bold';
`;

export const IconAndTitle = styled.View`
  flex: 1;
  flex-direction: row;
  gap: 14px;
`;
export const Title = styled.Text`
  font-size: 18px;
  font-family: 'MPLUSRounded1c-Bold';
`;

export const InactiveCategoryText = styled.Text`
  font-size: 14px;
  font-family: 'MPLUSRounded1c-Bold';
  color: ${theme.color.gray};
`;
