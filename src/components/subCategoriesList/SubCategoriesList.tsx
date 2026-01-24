import React from 'react';
import {
  Container,
  Header,
  HeaderContainer,
  SubCatText,
} from './SubCategoriesList.styles';
import { FlatList } from 'react-native-gesture-handler';
import { STRINGS } from '../../strings/hebrew';
import { SubCategoryType } from '../../shared/categoryType';
import Separator from '../separator/Separator';

const SubCategoriesList = ({
  subCategories,
}: {
  subCategories: SubCategoryType[];
}) => {
  const renderItem = ({ item }: { item: SubCategoryType }) => {
    return <SubCatText>{item.name}</SubCatText>;
  };

  return (
    <Container hasNoSubCategories={subCategories.length === 0}>
      <FlatList
        data={subCategories}
        keyExtractor={item => item.id}
        renderItem={renderItem}
        ListHeaderComponent={
          <HeaderContainer>
            <Header>
              {subCategories.length === 0
                ? STRINGS.NO_SUB_CATEGORIES
                : STRINGS.SUB_CATEGORIES}
            </Header>
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
