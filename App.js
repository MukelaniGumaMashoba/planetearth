import { NavigationContainer } from '@react-navigation/native';
import AuthNavigator from './src/navigation/AuthNavigation.js';
import { AppNavigation } from './src/navigation/AppNavigation.js';
import { LogBox } from 'react-native';
import { useContext } from "react";
import UserContextWrapper, { UserContext } from './userCtxt.js';
import { NativeBaseProvider } from 'native-base';

function App() {
  LogBox.ignoreAllLogs(true)

  return (
    <UserContextWrapper>
      <NativeBaseProvider>
        <RootNavigator />
      </NativeBaseProvider>
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
