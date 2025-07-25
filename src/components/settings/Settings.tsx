import { FC } from 'react';
import { Text, View } from 'react-native';
import ScreenLayout from '../screenLayout/ScreenLayout';

const Settings: FC = () => {
  return (
    <ScreenLayout>
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Settings Screen</Text>
      </View>
    </ScreenLayout>
  );
};

export default Settings;
