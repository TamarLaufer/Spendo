import { Provider } from 'react-redux';
import StackNavigation from './navigation/stack';
import { store } from './store';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Provider store={store}>
        <StackNavigation />
      </Provider>
    </GestureHandlerRootView>
  );
}

export default App;
