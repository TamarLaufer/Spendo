import { StyleSheet, Text } from 'react-native';
import { useExpenseWizard } from '../../zustandState/useExpenseWizard';
import { Pressable } from 'react-native';
import { PaymentMethods } from '../../bottomSheet/types';

const PaymentMethodsScreen = () => {
  const paymentMethods = useExpenseWizard(state => state.paymentMethods);
  const handleContinue = useExpenseWizard(state => state.handleContinue);
  const setPaymentMethod = useExpenseWizard(state => state.setPaymentMethod);
  const handlePaymentChoose = (selectedPayment: PaymentMethods['name']) => {
    setPaymentMethod(selectedPayment);
    handleContinue();
  };

  return paymentMethods.map(payment => {
    return (
      <Pressable
        key={payment.id}
        onPress={() => handlePaymentChoose(payment.name)}
        style={styles.categoryContainer}
      >
        <Text style={styles.text}>{payment.name}</Text>
      </Pressable>
    );
  });
};

const styles = StyleSheet.create({
  categoryContainer: {
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 15,
    elevation: 2,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  text: {
    height: 60,
    fontSize: 23,
    textAlign: 'center',
    verticalAlign: 'middle',
    color: '#333',
  },
});

export default PaymentMethodsScreen;
