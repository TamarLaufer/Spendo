import React from 'react';

import {
  Container,
  GreetingIcon,
  GreetingText,
  IconAndTextContainer,
  SubtitleText,
} from './HomeHeader.styles';
import { STRINGS } from '../../strings/hebrew';

type HomeHeaderProps = {
  greeting?: string;
  subtitle?: string;
};

const HomeHeader = ({}: HomeHeaderProps) => {
  return (
    <Container>
      <GreetingIcon>👋</GreetingIcon>
      <IconAndTextContainer>
        {/* TODO: get name from user */}
        <GreetingText>
          {STRINGS.HELLO_USER.replace('{{name}}', 'תמר')}
        </GreetingText>
        <SubtitleText>{STRINGS.MONTH_EXPENSES_TEXT}</SubtitleText>
      </IconAndTextContainer>
    </Container>
  );
};

export default HomeHeader;
