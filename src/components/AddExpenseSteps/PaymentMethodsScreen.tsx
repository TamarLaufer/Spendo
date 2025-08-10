import { useExpenseWizard } from '../../zustandState/useExpenseWizard';
import { PaymentMethods } from '../../bottomSheet/types';
import TransactionList from '../TransactionList/TransactionList';
import { StyleSheet, View } from 'react-native';

const PaymentMethodsScreen = () => {
  const paymentMethods = useExpenseWizard(state => state.paymentMethods);
  const handleContinue = useExpenseWizard(state => state.handleContinue);
  const setPaymentMethod = useExpenseWizard(state => state.setPaymentMethod);
  const handlePaymentChoose = (selectedPayment: PaymentMethods['name']) => {
    setPaymentMethod(selectedPayment);
    handleContinue();
  };

  return (
    <View style={styles.container}>
      {paymentMethods.map(payment => {
        return (
          <TransactionList
            keyExtractor={item => item.id}
            data={paymentMethods}
            mapItem={item => ({
              onPress: () => handlePaymentChoose(payment.name),
              text: item.name,
            })}
          />
        );
      })}
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
