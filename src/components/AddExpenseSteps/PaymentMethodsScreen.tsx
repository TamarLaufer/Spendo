import { useExpenseWizard } from '../../zustandState/useExpenseWizard';
import { PaymentMethods } from '../../bottomSheet/types';
import TransactionList from '../transactionList/TransactionList';
import { StyleSheet, View } from 'react-native';
import { useExpenseWizardNavigation } from '../../hooks/useExpenseWizardNavigation';

const PaymentMethodsScreen = () => {
  const paymentMethods = useExpenseWizard(state => state.paymentMethods);
  const { handleContinue } = useExpenseWizardNavigation();
  const setPaymentMethod = useExpenseWizard(state => state.setPaymentMethod);

  const handlePaymentChoose = (selectedPayment: PaymentMethods['name']) => {
    setPaymentMethod(selectedPayment);
    handleContinue();
  };

  return (
    <View style={styles.container}>
      <TransactionList
        keyExtractor={item => item.id}
        data={paymentMethods}
        mapItem={item => ({
          onPress: () => handlePaymentChoose(item.name),
          text: item.name,
        })}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 18,
    justifyContent: 'center',
    marginHorizontal: 35,
  },
});

export default PaymentMethodsScreen;
