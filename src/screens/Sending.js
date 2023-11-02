import React, { useState } from 'react';
import { View, TextInput, Button, DatePickerAndroid, TimePickerAndroid, Alert } from 'react-native';

const App = () => {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [expireDate, setExpireDate] = useState(null);

  const openDatePicker = async () => {
    try {
      const { action, year, month, day } = await DatePickerAndroid.open({
        date: new Date(),
        mode: 'default'
      });
      if (action !== DatePickerAndroid.dismissedAction) {
        openTimePicker(year, month, day);
      }
    } catch ({ code, message }) {
      console.warn('Cannot open date picker', message);
    }
  };

  const openTimePicker = async (year, month, day) => {
    try {
      const { action, hour, minute } = await TimePickerAndroid.open({
        hour: 0,
        minute: 0,
        is24Hour: false,
      });
      if (action !== TimePickerAndroid.dismissedAction) {
        const selectedDate = new Date(year, month, day, hour, minute);
        setExpireDate(selectedDate);
      }
    } catch ({ code, message }) {
      console.warn('Cannot open time picker', message);
    }
  };

  const sendNotification = () => {
    if (title && body && expireDate) {
      // Send notification logic goes here
      Alert.alert('Notification Sent', 'Notification has been sent successfully.');
    } else {
      Alert.alert('Error', 'Please fill out all fields and select an expiration date.');
    }
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', padding: 16 }}>
      <TextInput
        placeholder="Enter notification title"
        value={title}
        onChangeText={text => setTitle(text)}
        style={{ marginBottom: 16, padding: 10, borderColor: 'gray', borderWidth: 1 }}
      />
      <TextInput
        placeholder="Enter notification body"
        value={body}
        onChangeText={text => setBody(text)}
        style={{ marginBottom: 16, padding: 10, borderColor: 'gray', borderWidth: 1 }}
      />
      <Button title="Select Expiration Date" onPress={openDatePicker} />
      {expireDate && (
        <View style={{ marginTop: 16 }}>
          <Text>Selected Expiration Date: {expireDate.toString()}</Text>
        </View>
      )}
      <Button title="Send Notification" onPress={sendNotification} />
    </View>
  );
};

export default App;
