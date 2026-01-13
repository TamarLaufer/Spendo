import { useExpenseWizard } from '../../zustandState/useExpenseWizard';
import { PaymentMethods } from '../../bottomSheetExpenses/types';
import { FlatList, Pressable, StyleSheet, Text, View } from 'react-native';
import { useExpenseWizardNavigation } from '../../hooks/useExpenseWizardNavigation';

const PaymentMethodsScreen = () => {
  const paymentMethods = useExpenseWizard(state => state.paymentMethods);
  const { handleContinue } = useExpenseWizardNavigation();
  const setPaymentMethod = useExpenseWizard(state => state.setPaymentMethod);

  const handlePaymentChoose = (selectedPayment: PaymentMethods['name']) => {
    setPaymentMethod(selectedPayment);
    handleContinue();
  };

  const renderItem = ({ item }: { item: PaymentMethods }) => {
    return (
      <Pressable onPress={() => handlePaymentChoose(item.name)}>
        <Text>{item.name}</Text>
      </Pressable>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        keyExtractor={item => item.id}
        data={paymentMethods}
        renderItem={renderItem}
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
