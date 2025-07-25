import { FC } from 'react';
import { Text, View } from 'react-native';
import ScreenLayout from '../screenLayout/ScreenLayout';

const Home: FC = () => {
  return (
    <ScreenLayout>
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Home Screen</Text>
      </View>
    </ScreenLayout>
  );
};

export default Home;
