import registerNNPushToken from 'native-notify';
import { NavigationContainer } from '@react-navigation/native';
import AuthNavigator from './src/navigation/AuthNavigation.js';
import { AppNavigation } from './src/navigation/AppNavigation.js';
import { LogBox } from 'react-native';

import { useContext } from "react";
import UserContextWrapper, { UserContext } from './userCtxt.js';

function App() {
registerNNPushToken(12921, 'rQxU0BuVaZcxrvDRb5mqhT');
  LogBox.ignoreAllLogs();
  return (
    <UserContextWrapper>
      <RootNavigator />
    </UserContextWrapper>
  );
}

export default App;

const RootNavigator = () => {
  const { user } = useContext(UserContext);
  return (
    <NavigationContainer>
      {user ? <AppNavigation /> : <AuthNavigator />}
    </NavigationContainer>
  )
}
