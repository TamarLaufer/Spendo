import { FC } from 'react';
import { Text, View } from 'react-native';
import ScreenLayout from '../../components/screenLayout/ScreenLayout';

const Receipts: FC = () => {
  return (
    <ScreenLayout>
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Receipts Screen</Text>
      </View>
    </ScreenLayout>
  );
};

export default Receipts;
