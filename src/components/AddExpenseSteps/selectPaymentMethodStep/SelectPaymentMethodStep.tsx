import { useExpenseWizard } from '../../../zustandState/useExpenseWizard';
import { PaymentMethods } from '../../../bottomSheetExpenses/types';
import { useExpenseWizardNavigation } from '../../../hooks/useExpenseWizardNavigation';
import Separator from '../../separator/Separator';
import { BottomSheetFlatList } from '@gorhom/bottom-sheet';
import {
  Container,
  PaymentMethodText,
  Row,
} from './SelectPaymentMethodStep.styles';

const SelectPaymentMethodStep = () => {
  const paymentMethods = useExpenseWizard(state => state.paymentMethods);
  const { handleContinue } = useExpenseWizardNavigation();
  const setPaymentMethod = useExpenseWizard(state => state.setPaymentMethod);
  const selectedPaymentMethod = useExpenseWizard(state => state.paymentMethod);

  const handlePaymentChoose = (selectedPayment: PaymentMethods['name']) => {
    setPaymentMethod(selectedPayment);
    handleContinue();
  };

  const renderItem = ({ item }: { item: PaymentMethods }) => {
    return (
      <Row
        onPress={() => handlePaymentChoose(item.name)}
        isSelected={item.name === selectedPaymentMethod}
      >
        <PaymentMethodText>{item.name}</PaymentMethodText>
      </Row>
    );
  };

  return (
    <Container>
      <BottomSheetFlatList
        data={paymentMethods}
        keyExtractor={item => item.id}
        renderItem={renderItem}
        ItemSeparatorComponent={Separator}
        showsVerticalScrollIndicator={false}
      />
    </Container>
  );
};

export default SelectPaymentMethodStep;
