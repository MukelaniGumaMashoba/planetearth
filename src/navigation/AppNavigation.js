import React from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import Dashboard from '../screens/Dashboard';
import Game from '../screens/Game.js';
import { Settings } from '../screens/Settings';
import AccountScreen from '../screens/AccountScreen';
// import News from '../components/news';
// import Menu from '../components/menu';
import { CostSavings } from '../screens/CostSavings';

const Tab = createMaterialBottomTabNavigator();
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

function StackNavigator() {
    return (
      <Stack.Navigator>
        <Stack.Screen name="Home" component={Dashboard} />
        <Stack.Screen name="CostSavings" component={CostSavings} />
      </Stack.Navigator>
    );
  }


export function AppNavigation() {
    return (
        <Tab.Navigator
            initialRouteName="Home"
            shifting={true}
            barStyle={{ backgroundColor: 'lightgreen' }}
        >
            <Tab.Screen
                name="Home"
                component={StackNavigator}
                options={{
                    tabBarLabel: 'Home',
                    tabBarIcon: ({ color }) => (
                        <Icon name="home" color={color} size={26} />
                    ),
                }}
            />
            <Tab.Screen
                name="Settings"
                component={Settings}
                options={{
                    tabBarLabel: 'Calculator',
                    tabBarIcon: ({ color }) => (
                        <Icon name="calculator" color={color} size={26} />
                    ),
                }}
            />

            <Tab.Screen
                name="Game"
                component={Game}
                options={{
                    tabBarLabel: 'Game',
                    tabBarIcon: ({ color }) => (
                        <Icon name="game-controller" color={color} size={26} />
                    ),
                }}
            />
            <Tab.Screen
                name="Account"
                component={AccountScreen}
                options={{
                    tabBarLabel: 'Account',
                    tabBarIcon: ({ color }) => (
                        <Icon name="person" color={color} size={26} />
                    ),
                }}
            />
            {/* <Tab.Screen
                name="Menu"
                component={Menu}
                options={{
                    tabBarLabel: 'Menu',
                    tabBarIcon: ({ color }) => (
                        <Icon name="Setting" color={color} size={26} />
                    ),
                }}
            /> */}

        </Tab.Navigator>
    );
}
