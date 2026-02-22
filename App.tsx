/* eslint-disable react-hooks/exhaustive-deps */
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { StyleSheet } from 'react-native';
import RootNavigator from './src/navigation/RootNavigator';
import { useEffect } from 'react';
import {
  getFirestore,
  collection,
  getDocs,
  updateDoc,
  doc,
} from '@react-native-firebase/firestore';
import { getApp } from '@react-native-firebase/app';

function App() {
  const app = getApp();
  const firestore = getFirestore(app);

  const PAYMENT_METHOD_MAP: Record<string, string> = {
    'כרטיס אשראי': 'credit-card',
    מזומן: 'cash',
    'ביט/פייבוקס': 'bit-paybox',
    פייפאל: 'paypal',
    'העברה בנקאית': 'bank-transfer',
  };

  async function migratePaymentMethods() {
    console.log('Starting migration...');

    const snapshot = await getDocs(collection(firestore, 'expenses'));

    for (const docSnap of snapshot.docs) {
      const data = docSnap.data();

      if (data.paymentMethod) {
        const correctId = PAYMENT_METHOD_MAP[data.paymentMethod];

        if (!correctId) {
          console.warn('Unknown payment method:', data.paymentMethod);
          continue;
        }

        if (data.paymentMethodId !== correctId) {
          await updateDoc(doc(firestore, 'expenses', docSnap.id), {
            paymentMethodId: correctId,
          });

          console.log(`Fixed ${docSnap.id}`);
        }
      }
    }

    console.log('Migration finished');
  }

  useEffect(() => {
    migratePaymentMethods();
  }, []);

  return (
    <GestureHandlerRootView style={styles.gustureHendlar}>
      <RootNavigator />
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  gustureHendlar: { flex: 1 },
});

export default App;
