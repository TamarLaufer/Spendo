import React from 'react';
import {
  ButtonsContainer,
  FilterButtonText,
  FilterContainer,
  SearchText,
  SortButtonText,
  SortContainer,
} from './SortAndFilterButtons.styles';
import { getIconComponent } from '../../utils/getIconComponent';
import { TextInput } from 'react-native';
import { STRINGS } from '../../strings/hebrew';

type SortAndFilterButtonsProps = {
  textSearch: string;
  onSearchChange: (text: string) => void;
  onSortPress: () => void;
  onFilterPress: () => void;
  sortLabel: string;
  filterLabel: string;
  isFilterActive: boolean;
};

const SortAndFilterButtons = ({
  textSearch,
  onSearchChange,
  onSortPress,
  onFilterPress,
  sortLabel,
  filterLabel,
  isFilterActive,
}: SortAndFilterButtonsProps) => {

  const SortIcon = getIconComponent('sort');
  const FilterIcon = getIconComponent('filter');

  return (
    <ButtonsContainer>
      <TextInput value={textSearch} onChangeText={onSearchChange} placeholder={STRINGS.SEARCH_PLACEHOLDER}/>
      {textSearch && <SearchText>{textSearch}</SearchText>}
      <SortContainer onPress={onSortPress}>
        {SortIcon && <SortIcon width={20} height={20} />}
        <SortButtonText>{sortLabel}</SortButtonText>
      </SortContainer>
      <FilterContainer onPress={onFilterPress}>
         {FilterIcon && <FilterIcon width={22} height={22} />}
         <FilterButtonText active={isFilterActive}>{filterLabel}</FilterButtonText>
      </FilterContainer>
    </ButtonsContainer>
  );
};

export default SortAndFilterButtons;
