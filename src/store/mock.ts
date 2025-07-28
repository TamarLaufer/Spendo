import { CategoryType } from './types';

export const mockCategories: CategoryType[] = [
  {
    id: '1',
    name: 'מזון',
    maxAmount: 2000,
    subCategories: [
      { id: '1-1', name: 'סופרמרקט' },
      { id: '1-2', name: 'מכולת' },
      { id: '1-3', name: 'פירות וירקות' },
    ],
  },
  {
    id: '2',
    name: 'ביגוד והנעלה',
    maxAmount: 800,
    subCategories: [
      { id: '2-1', name: 'בגדי ילדים' },
      { id: '2-2', name: 'בגדי מבוגרים' },
      { id: '2-3', name: 'הנעלה' },
    ],
  },
  {
    id: '3',
    name: 'פנאי לילדים',
    maxAmount: 500,
    subCategories: [
      { id: '3-1', name: 'חוגים' },
      { id: '3-2', name: 'משחקים' },
      { id: '3-3', name: 'טיולים' },
    ],
  },
];
