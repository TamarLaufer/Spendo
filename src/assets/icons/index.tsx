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
import Logo from './logo-spendo.svg';
import Logout from './logout.svg';
import LogoNoBg from './logo-no-bg.svg';
import LogoNoBg2 from './logo-no-bg2.svg';
import LogoAndText from './logo-text-spendo.svg';
import PurseTop from './purse-part1.svg';
import PurseBody from './purse-part2.svg';
import Coin from './coin-part3.svg';
import PurseClosed from './close-purse.svg';
import PurseOpen from './open-purse.svg';
import PurseFull from './purse-full.svg';
import Purse from './purse.svg';
import LogoWallet from './logo-wallet.svg';

//other icons
export const Icons = {
  LogoAndText,
  Logo,
  LogoNoBg,
  LogoNoBg2,
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
  Logout,
  PurseTop,
  PurseBody,
  Coin,
  PurseClosed,
  PurseOpen,
  PurseFull,
  Purse,
  LogoWallet,
};

//categories icons
export const IconRegistry = {
  logoAndText: LogoAndText,
  logo: Logo,
  logoNoBg: LogoNoBg,
  logoNoBg2: LogoNoBg2,
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
  logout: Logout,
  purseTop: PurseTop,
  purseBody: PurseBody,
  coin: Coin,
  purseClosed: PurseClosed,
  purseOpen: PurseOpen,
  purseFull: PurseFull,
  purse: Purse,
  logoWallet: LogoWallet,
} as const;

export type IconKey = keyof typeof IconRegistry;
