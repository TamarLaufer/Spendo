import React from 'react';
import {
  Container,
  TitleContainer,
  MaxAmount,
  Title,
  IconContainer,
  AmountContainer,
  AmountText,
} from './OneCard.styles';
import { formatAmount } from '../../../utils/formatting';
import { STRINGS } from '../../../strings/hebrew';
import { IconKey, IconRegistry } from '../../../assets/icons';
import ProgressBar from '../../progressBar/ProgressBar';

type CategoryCard = {
  name: string;
  maxAmount?: number;
  icon: IconKey;
  percent: number;
  spent: number;
  onPress: () => void;
};

const OneCard = ({ name, maxAmount, icon, percent, spent, onPress }: CategoryCard) => {
  const Icon = icon ? IconRegistry[icon] : undefined;

  console.log('item.percent', percent);
  
  return (
    <Container onPress={onPress}>
      <TitleContainer>
        <IconContainer>{Icon && <Icon width={30} height={30} />}</IconContainer>
        <Title>{name}</Title>
      </TitleContainer>
      <AmountContainer>
        <AmountText>{STRINGS.SPENT} {formatAmount(spent)}</AmountText>
      </AmountContainer>
      <MaxAmount>
        {STRINGS.FROM} {formatAmount(maxAmount || 0)}
      </MaxAmount>
      <ProgressBar percent={percent} />
    </Container>
  );
};

export default OneCard;
