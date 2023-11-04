import React, { useState, useEffect, useRef } from 'react';
import { Platform } from 'react-native';
import * as Device from 'expo-device';
import Constants from 'expo-constants';
import * as Notifications from 'expo-notifications';
import { collection, query, onSnapshot, orderBy } from "firebase/firestore";
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/Ionicons';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Dashboard from '../screens/Dashboard';
import Game from '../screens/Game.js';
import AccountScreen from '../screens/AccountScreen';
import CostSavings from '../screens/CostSavings';
import Calculator from '../screens/Calculator'
import Gamification from '../screens/Gamification';
import Company from '../screens/Company';
import Inbox from '../screens/Inbox'
import { db } from '../../firebase.js';

Notifications.setNotificationHandler({
    handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: true,
        shouldSetBadge: true,
    }),
});


const Tab = createMaterialBottomTabNavigator();
const Stack = createNativeStackNavigator();

function StackNavigator() {
    return (
        <Stack.Navigator initialRouteName='Dashboard' screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Dashboard" component={Dashboard} />
            <Stack.Screen name="CostSavings" component={CostSavings} />
            <Stack.Screen name="Game" component={Game} />
            <Stack.Screen name="Company" component={Company} />
            <Stack.Screen name="Inbox" component={Inbox} options={{headerShown : true}} />
        </Stack.Navigator>
    );
}

export function AppNavigation() {
    return (
        <Stack.Navigator initialRouteName='app' screenOptions={{ headerShown: false }}>
            <Stack.Screen name="app" component={StackNavigatorTwo} />
            <Stack.Screen name="Company" options={{ headerShown: true }} component={Company} />
        </Stack.Navigator>
    );
}


function StackNavigatorTwo() {
    const [expoPushToken, setExpoPushToken] = useState(null);
    const [, setNotification] = useState(false);
    const [ready, setReady] = useState(false);
    const [idss, setIds] = useState([]);
    const notificationListener = useRef();
    const responseListener = useRef();

    useEffect(() => {

        (async () => {
            await getSavedNotification();
        })();

        registerForPushNotificationsAsync().then(token => {
            setExpoPushToken(token)
        });

        notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
            setNotification(notification);
        });

        responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
        });

        return () => {
            Notifications.removeNotificationSubscription(notificationListener.current);
            Notifications.removeNotificationSubscription(responseListener.current);
        };
    }, []);

    useEffect(() => {
        let unsubscribe = () => { }

        if (ready) {
            const q = query(collection(db, "notifications"), orderBy("expire", "desc"));
            unsubscribe = onSnapshot(q, async (querySnapshot) => {
                const ids = [];
                querySnapshot.forEach((doc) => {
                    if (doc.data().expire >= Date.now() && !idss.includes(doc.id)) {
                        if (expoPushToken) return schedulePushNotification({ ...doc.data(), to: expoPushToken });

                        schedulePushNotification(doc.data())
                    }

                    if (!idss.includes(doc.id)) {
                        ids.push(doc.id);
                    }
                });

                setIds((prev) => ([...prev, ...ids]));

                AsyncStorage.setItem("@notifications", JSON.stringify(idss), (err) => {

                })

            });
        }

        return () => unsubscribe()

    }, [ready, expoPushToken]);

    const getSavedNotification = async () => {
        try {
            const res = await AsyncStorage.getItem("@notifications");
            if (res) {
                setIds(JSON.parse(res))
            }
            setReady(true)
        } catch (error) {
        }
    }

    async function schedulePushNotification(content) {
        await Notifications.scheduleNotificationAsync({
            content,
            trigger: { seconds: 1, }
        });
    }

    async function registerForPushNotificationsAsync() {
        
        if (Platform.OS === 'android') {
            await Notifications.setNotificationChannelAsync('default', {
                name: 'default',
                importance: Notifications.AndroidImportance.MAX,
                vibrationPattern: [0, 250, 250, 250],
                lightColor: '#FF231F7C',
            });
        }

        if (!Device.isDevice) {
            return "";
        }
        const { status: existingStatus } = await Notifications.getPermissionsAsync();
        let finalStatus = existingStatus;
        if (existingStatus !== 'granted') {
            const { status } = await Notifications.requestPermissionsAsync();
            finalStatus = status;
        }
        if (finalStatus !== 'granted') {
            alert('Failed to get push token for push notification!');
            return;
        }

        return (await Notifications.getExpoPushTokenAsync({ projectId: Constants.expoConfig.extra.eas.projectId, })).data;
    }
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
            
        </Tab.Navigator>
    );
}
