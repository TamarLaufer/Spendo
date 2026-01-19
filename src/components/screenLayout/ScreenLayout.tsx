import React from 'react';
import TopBar from '../topBar/TopBar';
import { Container } from './ScreenLayout.styles';

export default function ScreenLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Container>
      <TopBar />
      {children}
    </Container>
  );
}
