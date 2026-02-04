import styled from 'styled-components/native';
import { theme } from '../../theme/theme';

export const ButtonsContainer = styled.View`
  flex-direction: row;
  margin-top: 28px;
  justify-content: space-between;
  width: 90%;
`;

export const SortContainer = styled.Pressable`
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 8px;
`;

export const SortButtonText = styled.Text`
  font-size: 14px;
  font-family: 'MPLUSRounded1c-Medium';
  color: ${theme.color.lightBlue};
`;

export const FilterContainer = styled.Pressable`
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 7px;
`;

export const FilterButton = styled.Pressable<{ active?: boolean }>`
  flex: 1;
  background-color: ${({ active }) =>
    active ? theme.color.lightBlue : 'white'};
  padding: 10px 16px;
  border-radius: 8px;
  border-width: 1px;
  border-color: ${theme.color.lightBlue};
  align-items: center;
  justify-content: center;
`;

export const FilterButtonText = styled.Text<{ active?: boolean }>`
  font-size: 14px;
  font-family: 'MPLUSRounded1c-Medium';
  color: ${({ active }) => (active ? 'white' : theme.color.lightBlue)};
`;

export const SearchText = styled.Text`
  font-size: 14px;
  font-family: 'MPLUSRounded1c-Medium';
  color: ${theme.color.lightBlue};
`;