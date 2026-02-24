import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { StyleSheet } from 'react-native';
import RootNavigator from './src/navigation/RootNavigator';

function App() {
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
