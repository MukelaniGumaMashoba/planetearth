import Dashboard from '../screens/Dashboard';
import { GameScreen } from '../screens/Game';
import { Settings } from '../screens/Settings';
import AccountScreen from '../screens/AccountScreen';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';

const Tab = createMaterialBottomTabNavigator();

export function AppNavigation() {
    return (
        <Tab.Navigator>
            <Tab.Screen name="Home" component={Dashboard} />
            <Tab.Screen name="Game" component={GameScreen} />
            <Tab.Screen name="Account" component={AccountScreen} />
            <Tab.Screen name="Settings" component={Settings} />
        </Tab.Navigator>
    );
}