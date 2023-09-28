import Log from '../screens/LogScreen';
import Register from '../screens/RegisterScreen';
import { CodeScreen } from '../screens/CodeScreen';
import { LoadingScreen } from '../screens/LoadingScreen';
import ResetPasswordScreen from '../screens/ResetPasswordScreen';

import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

function AuthNavigator() {
  return (
      <Stack.Navigator initialRouteName='Loading' screenOptions={{
        headerShown: false
      }}>
        <Stack.Screen name="Loading" component={LoadingScreen} />
        <Stack.Screen name="Login" component={Log} />
        <Stack.Screen name="Register" component={Register} />
        <Stack.Screen name="Code" component={CodeScreen} />
        <Stack.Screen name="ResetPasswordScreen" component={ResetPasswordScreen} />
      </Stack.Navigator>
  );
}

export default AuthNavigator;