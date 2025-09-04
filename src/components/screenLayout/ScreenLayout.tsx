import React from 'react';
import TopBar from '../topBar/TopBar';

export default function ScreenLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <TopBar />
      {children}
    </>
  );
}
