import { Fragment } from 'react';
import { Text, View } from 'react-native';
import { useExpenseWizard } from '../../zustandState/useExpenseWizard';
import { CategoryType } from '../../store/types';

const categoriesList: CategoryType[] = [
  {
    id: '1',
    name: 'מזון',
    maxAmount: 1500,
    subCategories: [
      { id: 'a', name: 'קניות בסופר' },
      { id: 'ua', name: 'אוכל בחוץ/מזון מהיר' },
    ],
  },
  {
    id: '2',
    name: 'ספורט',
    maxAmount: 300,
    subCategories: [{ id: 'j', name: 'מכון-כושר' }],
  },
  {
    id: '3',
    name: 'צעצועים לילדים',
    maxAmount: 240,
  },
  {
    id: '4',
    name: 'פעילות משפחתית',
    maxAmount: 400,
    subCategories: [
      { id: 'b', name: 'טיול יומי' },
      { id: 'bi', name: 'מלון/נופש' },
    ],
  },
  {
    id: '5',
    name: 'עיצוב/תחזוקת הבית',
    maxAmount: 200,
    subCategories: [
      { id: 'tra', name: 'תחזוקה-חובה' },
      { id: 'uea', name: 'עיצוב וכללי' },
    ],
  },
];

type ChooseSubCategoryStepType = {
  onBack: () => void;
  onNext: () => void;
};

const ChooseSubCategoryStep: React.FC<ChooseSubCategoryStepType> = ({
  onBack,
  onNext,
}) => {
  const {} = useExpenseWizard();
  return (
    <View>
      {categoriesList.map(category => {
        return (
          <Fragment>
            <Text>{category.name}</Text>
            <Text>{category.maxAmount}</Text>
          </Fragment>
        );
      })}
    </View>
  );
};

export default ChooseSubCategoryStep;
