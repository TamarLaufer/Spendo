import React from 'react';
import {
  Container,
  TitleContainer,
  MaxAmount,
  Title,
  IconContainer,
} from './OneCard.styles';
import { formatAmount } from '../../../utils/formatting';
import { STRINGS } from '../../../strings/hebrew';
import { IconKey, IconRegistry } from '../../../assets/icons';

type CategoryCard = {
  id: string;
  name: string;
  maxAmount?: number;
  icon: IconKey;
  onPress: () => void;
};

const OneCard = (item: CategoryCard) => {
  const Icon = item.icon ? IconRegistry[item.icon] : undefined;
  return (
    <Container
      onPress={item.onPress}
      // colors={['#44873D', '#FFFEFD']}
      // start={{ x: 0, y: 1 }}
      // end={{ x: 1, y: 0 }}
    >
      <TitleContainer>
        <IconContainer>{Icon && <Icon width={40} height={40} />}</IconContainer>
        <Title>{item.name}</Title>
      </TitleContainer>
      <MaxAmount>
        {STRINGS.FROM} {formatAmount(item.maxAmount || 0)}
      </MaxAmount>
    </Container>
  );
};

export default OneCard;
