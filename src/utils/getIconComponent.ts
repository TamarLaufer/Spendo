import { IconRegistry, IconKey } from '../assets/icons';
import { SvgProps } from 'react-native-svg';
import React from 'react';

export const getIconComponent = (
  iconKey?: IconKey,
): React.ComponentType<SvgProps> | undefined => {
  if (!iconKey) return undefined;
  return IconRegistry[iconKey];
};
