import Log from '../screens/LogScreen';
import Register from '../screens/RegisterScreen';
import { LoadingScreen } from '../screens/LoadingScreen';
import ResetPasswordScreen from '../screens/ResetPasswordScreen';
import Boarding1 from '../screens/boarding1';
import Boarding2 from '../screens/boarding2';
import Boarding3 from '../screens/boarding3';

import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AdminLog from '../screens/AdminLog';
import { AdminPage } from '../screens/AdminPage';
import SendingNotifications from '../screens/Sending';

const Stack = createNativeStackNavigator();

function AuthNavigator() {
  return (
      <Stack.Navigator initialRouteName='Loading' screenOptions={{
        headerShown: false
      }}>
        <Stack.Screen name="Loading" component={LoadingScreen} />
        <Stack.Screen name="AdminLog" component={AdminLog} />
        <Stack.Screen name="AdminPage" component={AdminPage} />
        <Stack.Screen name="Boarding1" component={Boarding1}/>
        <Stack.Screen name="Boarding2" component={Boarding2}/>
        <Stack.Screen name="Boarding3" component={Boarding3}/>
        <Stack.Screen name="Login" component={Log} />
        <Stack.Screen name="Register" component={Register} />
        <Stack.Screen name="ResetPasswordScreen" component={ResetPasswordScreen} />
        <Stack.Screen name="Sending" component={SendingNotifications} />
      </Stack.Navigator>
  );
}

export default AuthNavigator;