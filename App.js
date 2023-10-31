import registerNNPushToken, { getNotificationInbox } from 'native-notify';
import { NavigationContainer } from '@react-navigation/native';
import AuthNavigator from './src/navigation/AuthNavigation.js';
import { AppNavigation } from './src/navigation/AppNavigation.js';
import { LogBox } from 'react-native';

import { useContext } from "react";
import UserContextWrapper, { UserContext } from './userCtxt.js';
import { NativeBaseProvider } from 'native-base';
import { SafeAreaView } from 'react-native-safe-area-context';

function App() {
  //registerNNPushToken(13887, 'wJ3I2tFy54eqRawuXVfDDT');
  // getNotificationInbox(13887, "wJ3I2tFy54eqRawuXVfDDT").then((data) => {
  //   console.log(data);
  // })

  LogBox.ignoreAllLogs();
  return (
    <NativeBaseProvider>
      
      <UserContextWrapper>
        <RootNavigator />
      </UserContextWrapper>
    </NativeBaseProvider>
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
