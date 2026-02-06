import React from 'react';
import {
  ButtonsContainer,
  FilterButtonText,
  FilterContainer,
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
  sortDisplayed?: boolean;
  filterDisplayed?: boolean;
};

const SortAndFilterButtons = ({
  textSearch,
  onSearchChange,
  onSortPress,
  onFilterPress,
  sortLabel,
  filterLabel,
  isFilterActive,
  sortDisplayed,
  filterDisplayed,
}: SortAndFilterButtonsProps) => {
  const SortIcon = getIconComponent('sort');
  const FilterIcon = getIconComponent('filter');

  return (
    <ButtonsContainer>
      <TextInput
        value={textSearch}
        onChangeText={onSearchChange}
        placeholder={STRINGS.SEARCH_PLACEHOLDER}
      />
      {sortDisplayed && sortLabel && sortLabel !== '' && (
        <SortContainer onPress={onSortPress}>
          {SortIcon && <SortIcon width={20} height={20} />}
          <SortButtonText>{sortLabel}</SortButtonText>
        </SortContainer>
      )}
      {filterDisplayed && filterLabel && filterLabel !== '' && (
        <FilterContainer onPress={onFilterPress}>
          {FilterIcon && <FilterIcon width={22} height={22} />}
          <FilterButtonText active={isFilterActive}>
            {filterLabel}
          </FilterButtonText>
        </FilterContainer>
      )}
    </ButtonsContainer>
  );
};

export default SortAndFilterButtons;
