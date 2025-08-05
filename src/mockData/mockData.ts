import { CategoryType } from '../zustandState/useCategory';

export const categoriesList: CategoryType[] = [
  {
    categoryId: '1',
    categoryName: 'מזון',
    maxAmount: 1500,
    isExceed: false,
    subCategories: [
      { subCategoryId: 'o', subCategoryName: 'קניות בסופר' },
      { subCategoryId: 'a0', subCategoryName: 'אוכל בחוץ/מזון מהיר' },
    ],
  },
  {
    categoryId: '2',
    categoryName: 'ספורט',
    maxAmount: 300,
    isExceed: false,
    subCategories: [
      { subCategoryId: '9', subCategoryName: 'מכון-כושר' },
      { subCategoryId: '19', subCategoryName: 'פילאטיס מכשירים' },
      { subCategoryId: '19', subCategoryName: 'משהו אחר' },
    ],
  },
  {
    categoryId: '3',
    categoryName: 'צעצועים לילדים',
    maxAmount: 240,
    isExceed: false,
    subCategories: [],
  },
  {
    categoryId: '4',
    categoryName: 'פעילות משפחתית',
    maxAmount: 400,
    isExceed: false,
    subCategories: [
      { subCategoryId: '21', subCategoryName: 'טיול יומי' },
      { subCategoryId: '8', subCategoryName: 'מלון/נופש' },
    ],
  },
  {
    categoryId: '5',
    categoryName: 'עיצוב/תחזוקת הבית',
    maxAmount: 200,
    isExceed: false,
    subCategories: [
      { subCategoryId: 'a', subCategoryName: 'תחזוקה-חובה' },
      { subCategoryId: 'ab', subCategoryName: 'עיצוב וכללי' },
    ],
  },
  {
    categoryId: '6',
    categoryName: 'ימי הולדת',
    maxAmount: 200,
    isExceed: false,
    subCategories: [],
  },
];
