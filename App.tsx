import { GestureHandlerRootView } from 'react-native-gesture-handler';
import StackNavigation from './src/navigation/stack';
import { StyleSheet } from 'react-native';

function App() {
  return (
    <GestureHandlerRootView style={styles.gustureHendlar}>
      <StackNavigation />
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  gustureHendlar: { flex: 1 },
});

export default App;
