import React from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import Dashboard from '../screens/Dashboard';
import Game from '../screens/Game.js';
import AccountScreen from '../screens/AccountScreen';
import { CostSavings } from '../screens/CostSavings';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Settings from '../screens/Settings'

const Tab = createMaterialBottomTabNavigator();
const Stack = createNativeStackNavigator();

function StackNavigator() {
    return (
      <Stack.Navigator initialRouteName='Dashboard' screenOptions={{
        headerShown: false
      }}>
        <Stack.Screen name="Dashboard" component={Dashboard} />
        <Stack.Screen name="CostSavings" component={CostSavings} />
        <Stack.Screen name="Game" component={Game} />
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

            {/* <Tab.Screen
                name="Gamification"
                component={Gamification_}
                options={{
                    tabBarLabel: 'Gamification',
                    tabBarIcon: ({ color }) => (
                        <Icon name="game-controller" color={color} size={26} />
                    ),
                }}
            /> */}
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
        </Tab.Navigator>
    );
}
