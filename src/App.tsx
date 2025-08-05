import StackNavigation from './navigation/stack';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <StackNavigation />
    </GestureHandlerRootView>
  );
}

export default App;
