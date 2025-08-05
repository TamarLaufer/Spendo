export type Steps = 'amount' | 'category' | 'subCategory' | 'endProcess';

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
    showButton: true,
  },
  subCategory: {
    header: 'בחירת תת קטגוריה',
    buttonTitle: 'המשך',
    showButton: true,
  },
  endProcess: {
    header: 'תודה! נתראה בפעם הבאה :)',
    buttonTitle: 'סיום',
    showButton: true,
  },
};
