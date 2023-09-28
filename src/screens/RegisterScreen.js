import React, { useState } from 'react'
import { auth } from "../../firebase.js"
import Logo from '../components/Logo.js';
import { createUserWithEmailAndPassword } from "firebase/auth";
import { TextInput, Text, Button, View, TouchableOpacity, StyleSheet } from 'react-native'

export default function Register({ navigation }) {
  const [userData, setUserData] = useState({ email: "", password: "", cpassword: "" })

  const userRegister = () => {
    if (!userData.email || !userData.password) {
      setErrorMessage("Please enter both email and password.");
      return;
    }
    else if (userData.password != userData.cpassword) {
      setErrorMessage('The passwords do not match.');
    }

    createUserWithEmailAndPassword(auth, userData.email, userData.password)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log(user.uid)
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorMessage)
      });
  }

  return (
    <View style={styles.container}>
      <Logo />
      <View style={styles.new}>
        <TextInput
          placeholder='email'
          label="Email"
          returnKeyType="next" style={styles.input}
          autoCapitalize="none"
          autoCompleteType="email"
          textContentType="emailAddress"
          keyboardType="email-address"
          value={userData.email}
          onChangeText={(text) => { setUserData({ ...userData, email: text }) }}
        />
        <TextInput
          placeholder="Password"
          returnKeyType="done" style={styles.input}
          secureTextEntry
          value={userData.password}
          onChangeText={(text) => { setUserData({ ...userData, password: text }) }}
        />
        <TextInput
          placeholder="Confirm Password"
          returnKeyType="done" style={styles.input}
          secureTextEntry
          value={userData.cpassword}
          onChangeText={(text) => { setUserData({ ...userData, cpassword: text }) }}
        />
        <Button mode="contained" title='Enter' onPress={userRegister} />

        <TouchableOpacity onPress={() => navigation.navigate('Register')}>
          <Text style={styles.link}>Create Account</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
    backgroundColor: 'lightgreen',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    marginBottom: 16,
    borderWidth: 1,
    borderColor: 'blue',
    borderRadius: 5,
    padding: 10,
    fontSize: 16,
  },
  forgotPassword: {
    marginTop: 10,
  },
  forgot: {
    color: 'blue',
  },
  row: {
    flexDirection: 'row',
    marginTop: 10,
  },
  link: {
    color: 'blue',
    marginLeft: 5,
  },
  new: {
    borderWidth: 1,
    padding: 23,
    borderRadius: 23,
    backgroundColor: 'white'
  }
});
