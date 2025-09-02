import { FC } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import ScreenLayout from '../../components/screenLayout/ScreenLayout';

const Categories: FC = () => {
  return (
    <ScreenLayout>
      <View style={styles.container}>
        <Text>Categories Screen</Text>
      </View>
    </ScreenLayout>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default Categories;
