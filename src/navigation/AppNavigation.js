import React from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import Dashboard from '../screens/Dashboard';
import Game from '../screens/Game.js';
import AccountScreen from '../screens/AccountScreen';
import { CostSavings } from '../screens/CostSavings';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Calculator from '../screens/Calculator'
import Gamification from '../screens/Gamification';
import Company from '../screens/Company';
import Inbox from '../screens/Inbox'

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
            <Stack.Screen name="Company" component={Company} />
        </Stack.Navigator>
    );
}

export function AppNavigation() {
    return (
        <Stack.Navigator initialRouteName='app' screenOptions={{
            headerShown: false
        }}>
            <Stack.Screen name="app" component={StackNavigatorTwo} />
            <Stack.Screen name="Company" options={{ headerShown: true }} component={Company} />
        </Stack.Navigator>
    );
}


function StackNavigatorTwo() {
    return (
        <Tab.Navigator
            initialRouteName="Home"
            shifting={true}
            barStyle={{ backgroundColor: 'white' }}
        >
            <Tab.Screen
                name="Home"
                component={StackNavigator}
                options={{
                    tabBarLabel: 'Home',
                    tabBarIcon: ({ color }) => (
                        <Icon name="home" color={color} size={22} />
                    ),
                }}
            />
            <Tab.Screen
                name="Calculator"
                component={Calculator}
                options={{
                    tabBarLabel: 'Calculator',
                    tabBarIcon: ({ color }) => (
                        <Icon name="calculator" color={color} size={22} />
                    ),
                }}
            />

            <Tab.Screen
                name="Gamification"
                component={Gamification}
                options={{
                    tabBarLabel: 'Gamification',
                    tabBarIcon: ({ color }) => (
                        <Icon name="game-controller" color={color} size={22} />
                    ),
                }}
            />
            <Tab.Screen
                name="Account"
                component={AccountScreen}
                options={{
                    tabBarLabel: 'Account',
                    tabBarIcon: ({ color }) => (
                        <Icon name="person" color={color} size={22} />
                    ),
                }}
            />


            <Tab.Screen
                name="Inbox"
                component={Inbox}
                options={{
                    tabBarLabel: 'Inbox',
                    tabBarIcon: ({ color }) => (
                        <Icon name="bell" color={color} size={26} />
                    ),
                }}
            />



        </Tab.Navigator>
    );
}
