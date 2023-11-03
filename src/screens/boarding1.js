import React, { useEffect } from 'react';
import { Text, Image, StyleSheet, SafeAreaView, TouchableOpacity, View, ImageBackground } from 'react-native';
import * as Device from 'expo-device';
import * as Notifications from 'expo-notifications';

// Notifications.setNotificationHandler({
//   handleNotification: async () => ({
//     shouldShowAlert: true,
//     shouldPlaySound: false,
//     shouldSetBadge: false,
//   }),
// });
const Boarding1 = ({ navigation }) => {

  //     useEffect(()=>{
  //         registerForPushNotificationsAsync()
  //     }, [])


  // async function registerForPushNotificationsAsync() {
  //     let token;

  //     if (Platform.OS === 'android') {
  //       await Notifications.setNotificationChannelAsync('default', {
  //         name: 'default',
  //         importance: Notifications.AndroidImportance.MAX,
  //         vibrationPattern: [0, 250, 250, 250],
  //         lightColor: '#FF231F7C',
  //       });
  //     }

  //     if (Device.isDevice) {
  //       const { status: existingStatus } = await Notifications.getPermissionsAsync();
  //       let finalStatus = existingStatus;
  //       if (existingStatus !== 'granted') {
  //         const { status } = await Notifications.requestPermissionsAsync();
  //         finalStatus = status;
  //       }
  //       if (finalStatus !== 'granted') {
  //         alert('Failed to get push token for push notification!');
  //         return;
  //       }
  //       // Learn more about projectId:
  //       // https://docs.expo.dev/push-notifications/push-notifications-setup/#configure-projectid
  //       token = (await Notifications.getExpoPushTokenAsync({ projectId: 'your-project-id' })).data;
  //       console.log(token);
  //     } else {
  //       alert('Must use physical device for Push Notifications');
  //     }

  //     return token;
  //   }

  return (
    <SafeAreaView style={styles.safeArea}>
      <ImageBackground source={require('../assets/splash1.jpg')} style={styles.backgroundImage}>
        <View style={styles.container}>
          <Text style={styles.antext}>Welcome</Text>
          <Text style={styles.text}>
            You can now start by Allowing Notifications and learn more on how to use renewable resources available all times and make a change in planet earth with reminders
          </Text>
          <TouchableOpacity style={styles.btn} onPress={() => {
            //registerForPushNotificationsAsync()
            navigation.navigate('Boarding2')
          }}>
            <Text style={styles.texts}>Allow Notifications</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('Login')}>
            <Text style={styles.texts}>Skip for now</Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </SafeAreaView>
  )
}

export default Boarding1

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  backgroundImage: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    backgroundColor: 'rgba(173, 216, 230, 0.5)', // Use RGBA to set transparency
    borderRadius: 23,
    padding: 23,
    width: '80%', // Set container width to 80% of the screen
    justifyContent: 'center', // Center items vertically
    alignItems: 'center', // Center items horizontally
  },
  antext: {
    fontWeight: 'bold',
    fontSize: 22,
    textAlign: 'center',
    color: 'white',
  },
  text: {
    color: 'white',
    textAlign: 'center',
  },
  btn: {
    backgroundColor: 'black',
    borderRadius: 23,
    margin: 12,
    padding: 13,
    justifyContent: 'center',
    alignItems: 'center',
  },
  texts: {
    color: 'white',
    textAlign: 'center',
    fontWeight: 'bold',
  }
})
