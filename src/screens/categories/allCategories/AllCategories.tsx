import { FC, useState } from 'react';
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
  Row,
  RowText,
  Title,
} from './AllCategories.styles';
import AddCategory from '../../../components/addCategory/AddCategorySection';
import Separator from '../../../components/separator/Separator';
import { getIconComponent } from '../../../utils/getIconComponent';
import { RootNav } from '../../expenses/expenseDetails/types';
import { useNavigation } from '@react-navigation/native';

const AllCategories: FC = () => {
  const categories = useCategory(state => state.categories);
  const [displayAddCategory, setDisplayAddCategory] = useState(false);
  const navigation = useNavigation<RootNav>();

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
          data={categories}
          keyExtractor={item => item.id}
          renderItem={renderItem}
          ListHeaderComponent={
            <HeaderContainer>
              <Header>{STRINGS.CATEGORIES}</Header>
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
