import React, { useState } from 'react';
import { collection, addDoc } from "firebase/firestore";
import { View, TextInput, Button, Alert } from 'react-native';
import { db } from '../../firebase';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { Text } from 'react-native';

const SendingNotifications = () => {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [date, setDate] = useState(null);

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (pickedDate) => {
    console.log("A date has been picked: ", pickedDate);
    setDate(pickedDate); // Update the date state with the pickedDate
    hideDatePicker();
  };

  const sendNotification = async () => {
    if (title && body && date) {
      try {
        const expireTimestamp = date.getTime();
        const docRef = await addDoc(collection(db, "notifications"), {
          title: title,
          body: body,
          expire: expireTimestamp
        });
        console.log("Document written with ID: ", docRef.id);
        Alert.alert('Notification Sent', 'Notification has been sent successfully.');
      } catch (error) {
        console.error('Error adding document: ', error);
        Alert.alert('Error', 'Failed to send notification. Please try again later.');
      }
    } else {
      Alert.alert('Error', 'Please fill out all fields and select a date.');
    }
  };


  return (
    <View style={{ flex: 1, justifyContent: 'center', padding: 16 }}>
      <Text>Send Alerts</Text>

      <Text>Alert Title</Text>
      <TextInput
        placeholder="Enter notification title"
        value={title}
        onChangeText={text => setTitle(text)}
        style={{ marginBottom: 16, padding: 10, borderColor: 'gray', borderWidth: 1 }}
      />

      <Text>Alert Title</Text>
      <TextInput
        placeholder="Enter notification body"
        value={body}
        onChangeText={text => setBody(text)}
        style={{ marginBottom: 16, padding: 10, borderColor: 'gray', borderWidth: 1 }}
      />



      <View>
        <Button title="Show Date Picker" onPress={showDatePicker} style={{ marginBottom: 12 }} />
        <DateTimePickerModal
          isVisible={isDatePickerVisible}
          mode="datetime"

          onConfirm={handleConfirm}
          onCancel={hideDatePicker}
        />
      </View>

      <Text style={{ color: 'white' }}>Alert Title</Text>
      <Button title="Send Notification" onPress={sendNotification} />
    </View>
  );
};

export default SendingNotifications;
