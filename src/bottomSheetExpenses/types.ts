export type Steps =
  | 'amount'
  | 'category'
  | 'subCategory'
  | 'payMethod'
  | 'addNote'
  | 'endProcess';

export const PAYMENT_METHODS = [
  { id: 'credit-card', name: 'כרטיס אשראי' },
  { id: 'cash', name: 'מזומן' },
  { id: 'bit', name: 'ביט/פייבוקס' },
  { id: 'paypal', name: 'פייפאל' },
  { id: 'bank-transfer', name: 'העברה בנקאית' },
] as const;

export type PaymentMethods = (typeof PAYMENT_METHODS)[number];

export type StepsProps = {
  header?: string;
  buttonTitle?: string;
  showButton?: boolean;
};

export const StepsConfig: Record<Steps, StepsProps> = {
  amount: { buttonTitle: 'המשך', showButton: true },
  category: {
    header: 'בחירת קטגוריה',
    buttonTitle: 'המשך',
    showButton: false,
  },
  subCategory: {
    header: 'בחירת תת קטגוריה',
    buttonTitle: 'המשך',
    showButton: false,
  },
  payMethod: {
    header: 'איך שילמת?',
    showButton: false,
  },
  addNote: {
    header: 'הערות?',
    showButton: true,
    buttonTitle: 'המשך',
  },
  endProcess: {
    buttonTitle: 'סיום',
    showButton: true,
  },
};
