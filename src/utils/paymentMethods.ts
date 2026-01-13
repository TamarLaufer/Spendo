import { PaymentMethods } from '../bottomSheetExpenses/types';

const PAYMENT_METHOD_LABELS: Record<PaymentMethods['id'], string> = {
  'credit-card': 'כרטיס אשראי',
  cash: 'מזומן',
  bit: 'ביט',
  paypal: 'פייפאל',
  'bank-transfer': 'העברה בנקאית',
};

export const getPaymentMethodLabel = (
  methodId: PaymentMethods['id'],
): string => {
  return PAYMENT_METHOD_LABELS[methodId];
};
