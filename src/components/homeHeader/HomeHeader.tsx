import React from 'react';

import { Container, GreetingText, TextContainer } from './HomeHeader.styles';
import { STRINGS } from '../../strings/hebrew';
import { useAuthStore } from '../../zustandState/useAuthStore';

type HomeHeaderProps = {
  greeting?: string;
  subtitle?: string;
};

const HomeHeader = ({}: HomeHeaderProps) => {
  const user = useAuthStore(state => state.user);
  const userName = (user?.displayName ?? '').trim();

  const greeting = userName
    ? STRINGS.HELLO_USER.replace('{{name}}', userName)
    : STRINGS.HELLO_USER;

  return (
    <Container>
      <TextContainer>
        <GreetingText>{greeting}</GreetingText>
      </TextContainer>
    </Container>
  );
};

export default HomeHeader;
