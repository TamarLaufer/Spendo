import { FC, useState } from 'react';
import { FlatList } from 'react-native';
import ScreenLayout from '../../../components/screenLayout/ScreenLayout';
import { useCategory } from '../../../zustandState/useCategory';
import { STRINGS } from '../../../strings/hebrew';
import { CategoryType, SortConfig } from '../../../shared/categoryType';
import {
  AddCategoryButton,
  ButtonText,
  Container,
  Header,
  HeaderContainer,
  IconAndTitle,
  Row,
  RowText,
  Title,
} from './AllCategories.styles';
import AddCategory from '../../../components/addCategory/AddCategorySection';
import Separator from '../../../components/separator/Separator';
import { getIconComponent } from '../../../utils/getIconComponent';
import { RootNav } from '../../expenses/expenseDetails/types';
import { useNavigation } from '@react-navigation/native';
import SortAndFilterButtons from '../../../components/sortAndFilterButtons/SortAndFilterButtons';
import { useSortAndFilter } from '../../../hooks/useSortAndFilter';

const AllCategories: FC = () => {
  const categories = useCategory(state => state.categories);
  const [displayAddCategory, setDisplayAddCategory] = useState(false);
  const navigation = useNavigation<RootNav>();
  const [sortConfig, setSortConfig] = useState<
    SortConfig<CategoryType> | undefined
  >(undefined);
  const [filters, setFilters] = useState<
    ((item: CategoryType) => boolean) | undefined
  >(undefined);
  const {
    textSearch,
    setTextSearch,
    handleSortPress,
    handleFilterPress,
    sortLabel,
    filterLabel,
  } = useSortAndFilter(
    setSortConfig,
    setFilters,
    sortConfig,
    filters
  );

const filteredCategories = filters
  ? categories.filter(filters)
  : categories;

const sortedCategories = sortConfig
  ? [...filteredCategories].sort((a, b) => {
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
    })
  : filteredCategories;


  const handleCategoryPress = (categoryId: string) => {
    console.log(categoryId);
    navigation.navigate('CategoryDetails', { categoryId });
  };

  const handleAddCategoryPress = () => {
    setDisplayAddCategory(true);
  };

  const renderItem = ({ item }: { item: CategoryType }) => {
    const Icon = item.icon ? getIconComponent(item.icon) : undefined;

    return (
      <Row onPress={() => handleCategoryPress(item.id)}>
        <IconAndTitle>
          {Icon && <Icon width={30} height={30} />}
          <Title>{item.name}</Title>
        </IconAndTitle>
        <RowText>{item.maxAmount}</RowText>
      </Row>
    );
  };

  return (
    <ScreenLayout>
      <Container>
        <FlatList
          data={sortedCategories}
          keyExtractor={item => item.id}
          renderItem={renderItem}
          ListHeaderComponent={
            <HeaderContainer>
              <Header>{STRINGS.CATEGORIES}</Header>
              <SortAndFilterButtons textSearch={textSearch} onSearchChange={setTextSearch} onSortPress={handleSortPress}
               onFilterPress={handleFilterPress} sortLabel={sortLabel}
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
