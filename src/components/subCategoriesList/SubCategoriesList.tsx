import React from 'react';
import {
  Container,
  Header,
  HeaderContainer,
  Separator,
  SubCatText,
} from './SubCategoriesList.styles';
import { FlatList } from 'react-native-gesture-handler';
import { STRINGS } from '../../strings/hebrew';
import { SubCategoryType } from '../../shared/categoryType';

const SubCategoriesList = ({
  subCategories,
}: {
  subCategories: SubCategoryType[];
}) => {
  const renderItem = ({ item }: { item: SubCategoryType }) => {
    return <SubCatText>{item.name}</SubCatText>;
  };
  console.log('subCategories:', subCategories);
  return (
    <Container>
      <FlatList
        data={subCategories}
        keyExtractor={item => item.id}
        renderItem={renderItem}
        ListHeaderComponent={
          <HeaderContainer>
            <Header>{STRINGS.SUB_CATEGORIES}</Header>
          </HeaderContainer>
        }
        ItemSeparatorComponent={Separator}
        showsVerticalScrollIndicator={false}
        ListFooterComponent={<></>}
      />
    </Container>
  );
};

export default SubCategoriesList;
