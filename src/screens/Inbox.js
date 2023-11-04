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
import { StyleSheet } from 'react-native';
import { Dimensions } from 'react-native';

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
          alignContent: "center",
        }}>

        <FlatList
          data={notifications}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => {
            const date = new Date(item.createdAt || 1_699_043_759_501).toDateString();
            const time = new Date(item.createdAt || 1_699_043_759_501).toLocaleTimeString();
            return (
              <View>
                <View style={styles.messageContainer}>
                  <Text style={styles.messageTitle}>{item.title}</Text>
                  <Text style={styles.messageBody}>{item.body}</Text>
                  <Text style={styles.messageDate}>{`${date}, ${time}`}</Text>
                </View>
              </View>
            );
          }}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={() => <Text style={styles.emptyMessage}>No notifications this time 🎉</Text>}
        />


      </View>
    </SafeAreaView>
  );
}


const styles = StyleSheet.create({
  messageContainer: {
    backgroundColor: '#4CAF50',
    padding: 10,
    marginVertical: 12,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 3,
    width: Dimensions.get("screen").width,
    height: 100,
    margin: 2,
  },
  messageTitle: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  messageBody: {
    color: 'white',
    fontSize: 14,
    marginBottom: 10,
  },
  messageDate: {
    color: 'white',
    fontSize: 12,
    textAlign: 'right',
  },
  emptyMessage: {
    textAlign: 'center',
    marginTop: 20,
    fontSize: 18,
  },
});
