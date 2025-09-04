import { PaymentMethods } from '../bottomSheet/types';
import dayjs from 'dayjs';
import 'dayjs/locale/he';

dayjs.locale('he');

export const formatHebrewDate = (date: Date | string | number) => {
  return dayjs(date).format('[ביום] dddd, D.M.YY [בשעה] HH:mm');
};

export const formatAmount = (amount: number | string) => {
  const isDecimal = Number(amount) % 1 !== 0;
  const formatter = new Intl.NumberFormat('he-IL', {
    style: 'currency',
    currency: 'ILS',
    minimumFractionDigits: isDecimal ? 2 : 0,
    maximumFractionDigits: isDecimal ? 2 : 0,
  });
  const n = typeof amount === 'string' ? Number(amount) : amount;
  if (isNaN(n)) return '';

  return formatter.format(n);
};

export const getPaymentMethodLabel = (method: PaymentMethods): string => {
  switch (method) {
    case PaymentMethods.CreditCard:
      return 'כרטיס אשראי';
    case PaymentMethods.Cash:
      return 'מזומן';
    case PaymentMethods.Bit:
      return 'ביט';
    case PaymentMethods.PayPal:
      return 'פייפאל';
    case PaymentMethods.BankTransfer:
      return 'העברה בנקאית';
    default:
      return 'לא ידוע';
  }
};
