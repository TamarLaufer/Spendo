import type { SvgProps } from 'react-native-svg';
import CancelX from './close-svgrepo.svg';
import Back from './back-comback-hom-svgrepo.svg';
import Market from './supersal.svg';

export const Icons = {
  CancelX,
  Back,
  Market,
};

export type IconKey = 'market' | 'back' | 'cancelX';

export const IconRegistry: Record<IconKey, React.ComponentType<SvgProps>> = {
  market: Market,
  back: Back,
  cancelX: CancelX,
};
