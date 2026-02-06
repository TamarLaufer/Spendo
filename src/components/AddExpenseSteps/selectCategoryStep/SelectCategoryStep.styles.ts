import styled from 'styled-components/native';
import { theme } from '../../../theme/theme';

export const Container = styled.View`
  flex: 1;
  padding-vertical: 18px;
  margin-horizontal: 35px;
`;

export const Row = styled.TouchableOpacity<{ isSelected?: boolean }>`
  flex-direction: row;
  align-items: center;
  padding: 14px;
  border-radius: 12px;
  background-color: white;
  margin-bottom: 8px;
  
  ${({ isSelected }) => isSelected && `
    border-width: 2px;
    border-color: ${theme.color.lightBlue};
  `}
`;

export const RowText = styled.Text`
  font-size: 18px;
  margin-left: 12px;
`;

export const AddCategory = styled.TouchableOpacity`
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