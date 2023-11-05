import React, { useState } from 'react'
import { Alert, SafeAreaView, StyleSheet, Text, TextInput, View } from 'react-native'
import Logo from '../components/Logo';
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from '../../firebase';
import { Image } from 'react-native';
import { Button } from "native-base";

export default function ResetPasswordScreen({ navigation }) {
  const [email, setEmail] = useState({ value: '', error: '' });
  const [stateBtn, setBtnState] = useState(false);

  const sendResetPasswordEmail = () => {
    setBtnState(true)
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      Alert.alert('Invalid Email', 'Please enter a valid email address.');
      return setBtnState(false);
    }

    sendPasswordResetEmail(auth, email.value)
      .then(() => {
        Alert.alert("Success", `Email has been sent to ${email.value}`)
        return setBtnState(false);
      })
      .catch((error) => {
        Alert.alert("Error", error.message)
      }).finally(() => setBtnState(false));

  }

  return (
    <SafeAreaView>
      <Image source={require('../assets/LogBack.jpg')} style={styles.backgroundImage} />
      <View style={styles.container}>
        <Logo />
        <Text style={styles.title}>Reset your password.</Text>
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
          style={styles.input}
        />
        <Button
          onPress={sendResetPasswordEmail}
          isLoading={stateBtn}
          isLoadingText="Sending Email"
          size="md"
          bgColor="green.wethu"
        >RESET</Button>

      </View>
    </SafeAreaView>
  )
};

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    justifyContent: "center",
    padding: 20,
    height: '100%'
  },
  title: {
    fontSize: 18,
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
    backgroundColor: 'white'
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
  },
  backgroundImage: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
  },
});
