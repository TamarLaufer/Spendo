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
} from './Categories.styles';
import AddCategory from '../../../components/addCategory/AddCategorySection';
import Separator from '../../../components/separator/Separator';
import { getIconComponent } from '../../../utils/getIconComponent';

const Categories: FC = () => {
  const categories = useCategory(state => state.categories);
  const [displayAddCategory, setDisplayAddCategory] = useState(false);

  const handleCategoryPress = (categoryId: string) => {
    console.log(categoryId);
  };

  const handleAddCategoryPress = () => {
    setDisplayAddCategory(true);
  };

  const renderItem = ({ item }: { item: CategoryType }) => {
    const Icon = item.icon ? getIconComponent(item.icon) : undefined;

    return (
      <Row onPress={() => handleCategoryPress(item.id)}>
        <IconAndTitle>
          {Icon && <Icon width={20} height={20} />}
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

export default Categories;
