import { useState, useEffect, useRef } from 'react';
import { Text, View, Platform } from 'react-native';
import * as Device from 'expo-device';
import * as Notifications from 'expo-notifications';
import { collection, query, onSnapshot, orderBy } from "firebase/firestore";
import { db } from '../../firebase';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Constants from 'expo-constants';

export default function Inbox() {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    const q = query(collection(db, "notifications"), orderBy("expire", "desc"));
    const unsubscribe = onSnapshot(q, async (querySnapshot) => {
      const data = []
      querySnapshot.forEach((doc) => {
        data.push({ ...doc.data(), id: doc.id })
      });
      setNotifications(data)
    });

    return () => unsubscribe()

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
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => {
            const date = new Date(item.createdAt || 1_699_043_759_501).toDateString()
            const time = new Date(item.createdAt || 1_699_043_759_501).toLocaleTimeString()
            return (
              <View style={{ textAlign: "left", alignItems: 'center', backgroundColor: "green" }}>
                <Text style={{ color: "white", fontSize: 14 }}>{item.title} </Text>
                <Text style={{ color: "white", fontSize: 14 }}>{item.body}</Text>
                <Text style={{ color: "white", fontSize: 14 }}>
                  {`${date}, ${time}`}
                </Text>
              </View>
            )
          }}
          ListEmptyComponent={() => (<Text>No notifications this time 🎉</Text>)}
        />

      </View>
    </SafeAreaView>
  );
}