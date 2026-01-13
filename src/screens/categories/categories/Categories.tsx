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
  Row,
  RowText,
} from './Categories.styles';
import AddCategory from '../../../components/addCategory/AddCategory';

const Categories: FC = () => {
  const categories = useCategory(state => state.categories);
  const [displayAdding, setDisplayAdding] = useState(false);

  const onCategoryPress = (categoryId: string) => {
    console.log(categoryId);
  };

  const renderItem = ({ item }: { item: CategoryType }) => (
    <Row onPress={() => onCategoryPress(item.id)}>
      <RowText>{item.name}</RowText>
    </Row>
  );

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
          ListFooterComponent={
            <>
              {displayAdding && (
                <AddCategory setDisplayAddCategory={setDisplayAdding} />
              )}

              {!displayAdding && (
                <AddCategoryButton onPress={() => setDisplayAdding(true)}>
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
