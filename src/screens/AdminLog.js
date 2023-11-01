import Logo from '../components/Logo.js';
import React, { useContext, useState } from 'react'
import { TouchableOpacity, StyleSheet, View, Text, TextInput, Button, Image, Alert, ImageBackground } from 'react-native';

import LogBackground from '../assets/LogBack.jpg';

export default function AdminLog({ navigation }) {
  const [error, setErrorMessage] = useState('');
  const [userData, setUserData] = useState({ email: "", password: "" })

  const userLogin = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    setErrorMessage('');

    if (!emailRegex.test(userData.email)) {
      Alert.alert('Invalid Email', 'Please enter a valid email address.');
    }
    else if (!userData.email && !userData.password) {
      setErrorMessage("Email/Password Rquired..");
      return;
    }
    else if (!userData.email) {
      setErrorMessage("Email Rquired...");
      return;
    }
    else if (!userData.password) {
      setErrorMessage("Password required...");
      return;
    }
    else if(userData.password !== 'mukelani23'){
        setErrorMessage("Incorrect password")
    }
    else if(userData.email !== 'planetpulse@outlook.com'){
        setErrorMessage("Incorrect Email")
    }
    else{
        navigation.navigate('AdminPage')
    }

  }

  return (
    <ImageBackground source={LogBackground} style={styles.container}>
      <Logo style={styles.ogo} />
      <View style={styles.new}>
        <Text style={styles.title}>Welcome Admin! 👋</Text>
        <TextInput
          placeholder='Email'
          label="Email"
          returnKeyType="next"
          style={styles.input}
          autoCapitalize="none"
          autoCompleteType="email"
          textContentType="emailAddress"
          keyboardType="email-address"
          value={userData.email}
          onChangeText={(text) => { setUserData({ ...userData, email: text }) }}
        />
        <TextInput
          placeholder='Password'
          label="Password"
          returnKeyType="done"
          style={styles.input}
          secureTextEntry
          value={userData.password}
          onChangeText={(text) => { setUserData({ ...userData, password: text }) }}
        />
        {error !== '' && <Text style={styles.error}>{error}</Text>}

        <Button
          mode="contained"
          title='Log in'
          onPress={userLogin}
          color="green" 
          style={{ width: 200 }} 
        />
      </View>
    </ImageBackground>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 5,
    paddingVertical: 20,
    fontFamily: 'Roboto',
    backgroundColor: 'rgba(255, 255, 255, 0.7)', // 30% transparent white
  },
  title: {
    fontSize: 25,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  input: {
    marginBottom: 16,
    borderWidth: 1,
    borderColor: 'grey',
    borderRadius: 5,
    padding: 6,
    fontSize: 16,
    marginLeft: 6,
    marginRight: 6,
  },
  forgotPassword: {
    marginTop: 5,
  },
  forgot: {
    color: 'gray',
    textAlign: 'right',
    marginBottom: 12,
  },
  row: {
    flexDirection: 'row',
    marginTop: 10,
  },
  link: {
    color: 'green',
    marginLeft: 5,
  },
  ogo: {
    left: 100,
  },
  new: {
    padding: 23,
    borderRadius: 23,
    backgroundColor: 'white',
    opacity: 0.8
  },
  error: {
    color: 'red',
    textAlign: 'center',
  },
  acc: {
    marginTop: 9,
    textAlign: 'center',
  }
});
