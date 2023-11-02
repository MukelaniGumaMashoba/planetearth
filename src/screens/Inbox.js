import { useState, useEffect, useRef } from 'react';
import { Text, View, Platform } from 'react-native';
import * as Device from 'expo-device';
import * as Notifications from 'expo-notifications';
import { collection, query, onSnapshot, orderBy } from "firebase/firestore";
import { db } from '../../firebase';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
  }),
});

export default function Inbox() {
  const [, setExpoPushToken] = useState('');
  const [, setNotification] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [ready, setReady] = useState(false);
  const [idss, setIds] = useState([]);
  const notificationListener = useRef();
  const responseListener = useRef();

  useEffect(() => {
    const getSavedNotification = async () => {
      const res = await AsyncStorage.getItem("@notifications");
      if (res) {
        setIds(JSON.parse(res))
        setReady(true)
      }
    }

    (async () => {
      await getSavedNotification();
    })();
    let unsubscribe = () => { }


    if (ready) {
      const q = query(collection(db, "notifications"), orderBy("expire", "desc"));
      unsubscribe = onSnapshot(q, async (querySnapshot) => {
        const noti = [];
        const ids = [];

        querySnapshot.forEach((doc) => {
          noti.push({ ...doc.data(), id: doc.id });
          if (Date(doc.data().expire) >= Date(Date.now()) && !idss.includes(doc.id)) {
            schedulePushNotification(doc.data())
          }

          if (!idss.includes(doc.id)) {
            ids.push(doc.id);
          }
        });

        setIds((prev) => ([...prev, ...ids]))
        setNotifications(noti)
        AsyncStorage.setItem("@notifications", JSON.stringify(idss), (err) => {
          //console.error("Saving Eror:", err)
        })
      });
    }

    return async () => unsubscribe()

  }, [ready]);
  useEffect(() => {
    registerForPushNotificationsAsync().then(token => setExpoPushToken(token));

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

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View
        style={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
          alignContent: "center"
        }}>

        <FlatList
          data={notifications}

          renderItem={({ item }) => (
            <View style={{textAlign: "left", alignItems: 'center',backgroundColor: "green" }}>
              <Text style={{color: "white", fontSize: 14}}>{item.title} </Text>
              <Text style={{color: "white", fontSize: 14}}>{item.body}</Text>
              <Text style={{color: "white", fontSize: 14}}>{Date(item.expire)}</Text>
            </View>
          )}

          ListEmptyComponent={()=>(<Text>No notifications this time 🎉</Text>)}
        />

      </View>
      </SafeAreaView>
  );
}

async function schedulePushNotification(content) {
  await Notifications.scheduleNotificationAsync({
    content,

    trigger: { seconds: 1, }
  });
}

async function registerForPushNotificationsAsync() {
  let token;

  if (Platform.OS === 'android') {
    await Notifications.setNotificationChannelAsync('default', {
      name: 'default',
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: '#FF231F7C',
    });
  }

  if (Device.isDevice) {
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

    token = (await Notifications.getExpoPushTokenAsync({ projectId: 'your-project-id' })).data;
    // console.log(token);
  } else {
    alert('Must use physical device for Push Notifications');
  }

  return token;
}
