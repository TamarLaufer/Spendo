import React from 'react';
import { formatAmount } from '../../utils/formatting';
import {
  BalanceAmount,
  BalanceTextContainer,
  Container,
  MaxAmount,
  RegularText,
} from './Balance.styles';
import { STRINGS } from '../../strings/hebrew';
import { useBudgetStats } from '../../hooks/useBudgetStats';

const Balance = () => {
  const { total } = useBudgetStats();

  return (
    <Container>
      {/* TODO: get name from user */}
      <BalanceTextContainer>
        <BalanceAmount>{formatAmount(total.spent)}</BalanceAmount>
        <MaxAmount>
          <RegularText>{STRINGS.FROM} </RegularText>
          {formatAmount(total.max)}
        </MaxAmount>
      </BalanceTextContainer>
    </Container>
  );
};

export default Balance;
