import CancelX from './close-svgrepo.svg';
import Back from './back-comback-hom-svgrepo.svg';
import Market from './shopping-cart.svg';
import Payment from './payment.svg';
import Car from './car.svg';
import Classes from './classes.svg';
import Health from './health.svg';
import Toys from './toys.svg';
import Study from './study.svg';
import DefaultIcon from './money-default-icon.svg';
import Events from './ticket.svg';
import Hobies from './hobies.svg';
import Filter from './filter.svg';
import Sort from './sort.svg';

//other icons
export const Icons = {
  CancelX,
  Back,
  Market,
  Payment,
  Car,
  Classes,
  Health,
  Toys,
  Study,
  DefaultIcon,
  Events,
  Hobies,
  Filter,
  Sort,
};

//categories icons
export const IconRegistry = {
  filter: Filter,
  sort: Sort,
  market: Market,
  back: Back,
  cancelX: CancelX,
  payment: Payment,
  car: Car,
  classes: Classes,
  health: Health,
  toys: Toys,
  study: Study,
  defaultIcon: DefaultIcon,
  events: Events,
  hobies: Hobies,
} as const;

export type IconKey = keyof typeof IconRegistry;
