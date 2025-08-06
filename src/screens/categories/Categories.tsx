import { FC } from 'react';
import { Text, View } from 'react-native';
import ScreenLayout from '../../components/screenLayout/ScreenLayout';

const Categories: FC = () => {
  return (
    <ScreenLayout>
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Categories Screen</Text>
      </View>
    </ScreenLayout>
  );
};

export default Categories;
