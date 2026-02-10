import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { StyleSheet } from 'react-native';
import RootNavigation from './src/navigation/RootNavigation';

function App() {
  return (
    <GestureHandlerRootView style={styles.gustureHendlar}>
      <RootNavigation />
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  gustureHendlar: { flex: 1 },
});

export default App;
