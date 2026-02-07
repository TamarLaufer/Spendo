import { useExpenseWizard } from '../../../zustandState/useExpenseWizard';
import { useCategory } from '../../../zustandState/useCategory';
import { STRINGS } from '../../../strings/hebrew';
import { formatAmount } from '../../../utils/formatting';
import { useSubcatIndex } from '../../../zustandState/useSubCategoriesIndex';
import { Container, StyledText, TextContainer } from './EndProcessStep.styles';

const EndProcessStep = () => {
  const categoryId = useExpenseWizard(state => state.categoryId);
  const amount = useExpenseWizard(state => state.amount);
  const subCategoryId = useExpenseWizard(state => state.subCategoryId);
  const subCat = useSubcatIndex(state =>
    categoryId && subCategoryId
      ? state.index[categoryId]?.[subCategoryId]
      : undefined,
  );

  const findCategoryById = useCategory(state => state.findCategoryById);
  const expenseObj = findCategoryById(categoryId);
  const paymentMethod = useExpenseWizard(state => state.paymentMethod);

  const isAmountExist = amount ? formatAmount(amount) : '';

  return (
    <Container>
      <TextContainer>
        <StyledText>{STRINGS.EXPENSE_SUCCEDED}</StyledText>
        <StyledText>{`${STRINGS.EXPENSE_IN}: ${expenseObj?.name} ${
          subCat?.name ? `- ${subCat?.name}` : ''
        }`}</StyledText>
      </TextContainer>
      <StyledText>{`${isAmountExist} ב${paymentMethod}`}</StyledText>
      {/* <Text style={styles.amountText}>{`ב${paymentMethod}`}</Text> */}
    </Container>
  );
};

export default EndProcessStep;
