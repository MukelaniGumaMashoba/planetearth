import Log from '../screens/LogScreen';
import Register from '../screens/RegisterScreen';
import { CodeScreen } from '../screens/CodeScreen';
import { LoadingScreen } from '../screens/LoadingScreen';
import ResetPasswordScreen from '../screens/ResetPasswordScreen';
import Boarding1 from '../screens/boarding1';
import Boarding2 from '../screens/boarding2';
import Boarding3 from '../screens/boarding3';

import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

function AuthNavigator() {
  return (
      <Stack.Navigator initialRouteName='Loading' screenOptions={{
        headerShown: false
      }}>
        <Stack.Screen name="Loading" component={LoadingScreen} />
        <Stack.Screen name="Boarding1" component={Boarding1}/>
        <Stack.Screen name="Boarding2" component={Boarding2}/>
        <Stack.Screen name="Boarding3" component={Boarding3}/>
        <Stack.Screen name="Login" component={Log} />
        <Stack.Screen name="Register" component={Register} />
        <Stack.Screen name="Code" component={CodeScreen} />
        <Stack.Screen name="ResetPasswordScreen" component={ResetPasswordScreen} />
      </Stack.Navigator>
  );
}

export default AuthNavigator;