import React, { useState } from 'react'
import { Alert, Button, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import Logo from '../components/Logo';

import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from '../../firebase';



export default function ResetPasswordScreen({ navigation }) {
  const [email, setEmail] = useState({ value: '', error: '' })

  const sendResetPasswordEmail = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.value)) {
      setEmail({ ...email, error: emailError })
      return
    }

    sendPasswordResetEmail(auth, email.value)
      .then(() => {
        Alert.alert("Success", "Email has been sent to" + email.value)
      })
      .catch((error) => {
        Alert.alert("Error", error.message)
      });

  }

  return (
    <View>
      <Logo />
      <Text>Reset your password.</Text>
      <TextInput
        label="Email"
        returnKeyType="done"
        value={email.value}
        onChangeText={(text) => setEmail({ value: text, error: '' })}
        error={!!email.error}
        errorText={email.error}
        autoCapitalize="none"
        autoCompleteType="email"
        textContentType="emailAddress"
        keyboardType="email-address"
      />
      <Button
        mode="contained"
        onPress={sendResetPasswordEmail}
        style={{ marginTop: 16 }}
        title='Continue'
      />

      <View style={styles.row}>
        <TouchableOpacity onPress={() => navigation.navigate('Register')}>
          <Text style={styles.link}>Create Account</Text>
        </TouchableOpacity>
      </View>

    </View>
  )
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 20
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    marginBottom: 16,
    borderWidth: 1,
    borderColor: 'grey',
    borderRadius: 16,
    padding: 6,
    fontSize: 16,
    marginLeft: 6,
    marginRight: 6,
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
  ogo: {
    left: 100,
  }
});
