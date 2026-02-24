import { FC, useCallback, useEffect, useMemo, useState } from 'react';
import { FlatList } from 'react-native';
import ScreenLayout from '../../../components/screenLayout/ScreenLayout';
import { useCategory } from '../../../zustandState/useCategory';
import { STRINGS } from '../../../strings/hebrew';
import { CategoryType } from '../../../shared/categoryType';
import {
  AddCategoryButton,
  ButtonText,
  Container,
  Header,
  HeaderContainer,
  IconAndTitle,
  InactiveCategoryText,
  Row,
  RowText,
  Title,
} from './AllCategories.styles';
import AddCategory from '../../../components/addCategory/AddCategorySection';
import Separator from '../../../components/separator/Separator';
import { getIconComponent } from '../../../utils/getIconComponent';
import { RootNav } from '../../expenses/expenseDetails/types';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import SortAndFilterButtons from '../../../components/sortAndFilterButtons/SortAndFilterButtons';
import { useSortFilterAndSearch } from '../../../hooks/useSortFilterAndSearch';

const AllCategories: FC = () => {
  const categories = useCategory(state => state.categories);
  const [displayAddCategory, setDisplayAddCategory] = useState(false);
  const navigation = useNavigation<RootNav>();
  const {
    textSearch,
    setTextSearch,
    sortConfig,
    setSortConfig,
    filters,
    setFilters,
  } = useSortFilterAndSearch<CategoryType>();

  const handleSortPress = () => {
    if (!sortConfig) {
      setSortConfig({ key: 'name', direction: 'asc' });
    } else if (sortConfig.key === 'name' && sortConfig.direction === 'asc') {
      setSortConfig({ key: 'name', direction: 'desc' });
    } else if (sortConfig.key === 'name') {
      setSortConfig({ key: 'maxAmount', direction: 'asc' });
    } else if (sortConfig.direction === 'asc') {
      setSortConfig({ key: 'maxAmount', direction: 'desc' });
    } else {
      setSortConfig(undefined);
    }
  };

  useEffect(() => {
    setTextSearch('');
  }, [filters, sortConfig, setTextSearch]);

  useFocusEffect(
    useCallback(() => {
      return () => {
        // reset when leaving screen
        setSortConfig(undefined);
        setFilters(undefined);
        setTextSearch('');
      };
    }, [setSortConfig, setFilters, setTextSearch]),
  );

  const handleFilterPress = () => {
    setFilters(filters ? undefined : (item: CategoryType) => item.isExceed);
  };

  const sortByActive = (a: CategoryType, b: CategoryType) => {
    const aInactive = a.active === false;
    const bInactive = b.active === false;

    if (aInactive && !bInactive) return 1;
    if (!aInactive && bInactive) return -1;

    return 0;
  };

  const processedCategories = useMemo(() => {
    let result = [...categories];

    if (filters) {
      result = result.filter(filters);
    }

    if (sortConfig) {
      result = result.sort((a, b) => {
        const activeCompare = sortByActive(a, b);
        if (activeCompare !== 0) return activeCompare;

        if (sortConfig.key === 'name') {
          return sortConfig.direction === 'asc'
            ? a.name.localeCompare(b.name)
            : b.name.localeCompare(a.name);
        }

        if (sortConfig.key === 'maxAmount') {
          return sortConfig.direction === 'asc'
            ? a.maxAmount - b.maxAmount
            : b.maxAmount - a.maxAmount;
        }

        return 0;
      });
    } else {
      result.sort(sortByActive);
    }

    if (textSearch) {
      result = result.filter(item =>
        item.name.toLowerCase().includes(textSearch.toLowerCase()),
      );
    }

    return result;
  }, [categories, filters, sortConfig, textSearch]);

  const handleAddCategoryPress = () => {
    setDisplayAddCategory(true);
  };

  const handleCategoryPress = (categoryId: string) => {
    navigation.navigate('CategoryDetails', { categoryId });
  };

  const sortLabel = (() => {
    if (!sortConfig) return STRINGS.SORT;

    const SORT_LABELS: Record<string, string> = {
      name: STRINGS.NAME,
      maxAmount: STRINGS.BUDGET,
    };

    const keyLabel = SORT_LABELS[sortConfig.key];
    const directionLabel =
      sortConfig.direction === STRINGS.SORT_ASC ? '↓' : '↑';

    return `${STRINGS.SORT}: ${keyLabel} ${directionLabel}`;
  })();

  const filterLabel = filters ? STRINGS.FILTER_ACTIVE : STRINGS.FILTER;

  const renderItem = ({ item }: { item: CategoryType }) => {
    const inactiveCategory = item.active === false;
    const Icon = item.icon ? getIconComponent(item.icon) : undefined;

    return (
      <Row
        onPress={() => handleCategoryPress(item.id)}
        disabled={inactiveCategory}
      >
        <IconAndTitle>
          {Icon && <Icon width={30} height={30} />}
          <Title>
            {item.name}
            {inactiveCategory ? (
              <InactiveCategoryText>
                {STRINGS.CATEGORY_INACTIVE}
              </InactiveCategoryText>
            ) : (
              ''
            )}
          </Title>
        </IconAndTitle>
        <RowText>{item.maxAmount}</RowText>
      </Row>
    );
  };

  return (
    <ScreenLayout>
      <Container>
        <FlatList
          data={processedCategories}
          keyExtractor={item => item.id}
          renderItem={renderItem}
          ListHeaderComponent={
            <HeaderContainer>
              <Header>{STRINGS.CATEGORIES}</Header>
              <SortAndFilterButtons
                sortDisplayed
                textSearch={textSearch}
                onSearchChange={setTextSearch}
                onSortPress={handleSortPress}
                onFilterPress={handleFilterPress}
                sortLabel={sortLabel}
                filterLabel={filterLabel}
                isFilterActive={!!filters}
              />
            </HeaderContainer>
          }
          ItemSeparatorComponent={Separator}
          showsVerticalScrollIndicator={false}
          ListFooterComponent={
            <>
              {displayAddCategory ? (
                <AddCategory setDisplayAddCategory={setDisplayAddCategory} />
              ) : (
                <AddCategoryButton onPress={handleAddCategoryPress}>
                  <ButtonText>{STRINGS.ADD_NEW_CATEGORY}</ButtonText>
                </AddCategoryButton>
              )}
            </>
          }
        />
      </Container>
    </ScreenLayout>
  );
};

export default AllCategories;
