import type { SvgProps } from 'react-native-svg';
import CancelX from './close-svgrepo.svg';
import Back from './back-comback-hom-svgrepo.svg';
import Market from './supersal.svg';
import Payment from './payment.svg';
import Car from './car.svg';

export const Icons = {
  CancelX,
  Back,
  Market,
  Payment,
  Car,
};

export type IconKey = 'market' | 'back' | 'cancelX' | 'payment' | 'car';

export const IconRegistry: Record<IconKey, React.ComponentType<SvgProps>> = {
  market: Market,
  back: Back,
  cancelX: CancelX,
  payment: Payment,
  car: Car,
};

export function ExpenseIcon({
  iconId,
  categoryId,
  size = 20,
}: {
  iconId?: IconKey;
  categoryId: string;
  size?: number;
}) {
  const candidate = iconId ?? categoryId;

  function isIconKey(key: string): key is IconKey {
    return key in IconRegistry;
  }

  if (!candidate || !isIconKey(candidate)) return null;
  if (!candidate) return null;
  const Comp = IconRegistry[candidate];
  return <Comp width={size} height={size} />;
}
