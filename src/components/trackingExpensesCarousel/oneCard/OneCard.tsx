import React from 'react';
import {
  Container,
  TitleContainer,
  MaxAmount,
  Title,
  IconContainer,
} from './OneCard.styles';
import { formatAmount, formatPercent } from '../../../utils/formatting';
import { STRINGS } from '../../../strings/hebrew';
import { IconKey, IconRegistry } from '../../../assets/icons';
import ProgressBar from '../../progressBar/ProgressBar';
import { Text } from 'react-native';

type CategoryCard = {
  id: string;
  name: string;
  maxAmount?: number;
  icon: IconKey;
  percent: number;
  onPress: () => void;
};

const OneCard = (item: CategoryCard) => {
  const Icon = item.icon ? IconRegistry[item.icon] : undefined;

  console.log('item.percent', item.percent);
  
  return (
    <Container
      onPress={item.onPress}
      // colors={['#44873D', '#FFFEFD']}
      // start={{ x: 0, y: 1 }}
      // end={{ x: 1, y: 0 }}
    >
      <TitleContainer>
        <IconContainer>{Icon && <Icon width={30} height={30} />}</IconContainer>
        <Title>{item.name}</Title>
      </TitleContainer>
      <MaxAmount>
        {STRINGS.FROM} {formatAmount(item.maxAmount || 0)}
      </MaxAmount>
      <Text>{formatPercent(item.percent)}</Text>
      <ProgressBar percent={item.percent} />
    </Container>
  );
};

export default OneCard;
