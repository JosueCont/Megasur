import { StatusBar } from 'expo-status-bar';
import { StyleSheet, LogBox } from 'react-native';
import { Provider } from 'react-redux';
import { store } from './src/store/store';
import { theme } from './src/utils/theme';
import { NativeBaseProvider } from 'native-base';
import NavigationContainerConfig from './src/stacks/NavigationContainerConfig';
import { Buffer } from 'buffer';
import * as Notifications from 'expo-notifications';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
      shouldShowAlert: true,
      shouldPlaySound: true,
      shouldSetBadge: true,
  }),
});

export default function App() {
  LogBox.ignoreAllLogs();
  global.Buffer = Buffer;

  return (
    <Provider store={store}>
      <NativeBaseProvider theme={theme}>
        <NavigationContainerConfig />
      </NativeBaseProvider>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
