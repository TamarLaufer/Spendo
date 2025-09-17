import CancelX from './close-svgrepo.svg';
import Back from './back-comback-hom-svgrepo.svg';
import Market from './supersal.svg';
import Payment from './payment.svg';
import Car from './car.svg';
import Classes from './classes.svg';
import Health from './health.svg';

//other icons
export const Icons = {
  CancelX,
  Back,
  Market,
  Payment,
  Car,
  Classes,
  Health,
};

//categories icons
export const IconRegistry = {
  market: Market,
  back: Back,
  cancelX: CancelX,
  payment: Payment,
  car: Car,
  classes: Classes,
  health: Health,
} as const;

export type IconKey = keyof typeof IconRegistry;
