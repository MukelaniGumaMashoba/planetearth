import React, { useContext, useState } from 'react'
import { auth, db } from "../../firebase.js"
import Logo from '../components/Logo.js';
import { UserContext } from '../../userCtxt.js';
import { createUserWithEmailAndPassword } from "firebase/auth";
import { TextInput, Text, View, TouchableOpacity, StyleSheet, Alert, ImageBackground } from 'react-native';
import LogOption from '../components/LogOption.js';
import LogBackground from '../assets/LogBack.jpg';
import { collection, doc, setDoc } from 'firebase/firestore';
import { Button } from "native-base";

export default function Register({ navigation }) {
  const [error, setErrorMessage] = useState('');
  const [userData, setUserData] = useState({ email: "", password: "", cpassword: "", name: "" })
  const [stateBtn, setBtnState] = useState(false)
  const { doLogin } = useContext(UserContext)
  const userRegister = () => {

    setBtnState(true)
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(userData.email)) {
      Alert.alert('Invalid Email', 'Please enter a valid email address.');
      return setBtnState(false);
    }
    if (!userData.email || !userData.password) {
      setErrorMessage("Please enter both email and password.");
      return setBtnState(false);
    }
    else if (userData.password != userData.cpassword) {
      setErrorMessage('The passwords do not match.');
      return setBtnState(false);
    }

    createUserWithEmailAndPassword(auth, userData.email, userData.password)
      .then(async (userCredential) => {
        const user = userCredential.user;

        const { email, photoURL, uid, displayName, emailVerified, phoneNumber } = user

        await setDoc(doc(db, "users", user.uid), {
          name: userData.name,
          email, photoURL, uid, displayName, emailVerified, phoneNumber
        }).then(() => doLogin(user)).catch((r) => console.log(r))
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        if (errorCode === "auth/email-already-in-use") {
          setErrorMessage("Email address is already in use.");
        } else {
          setErrorMessage(errorMessage);
        }
      }
      )
      .finally(() => setBtnState(false));
  }

  return (
    <ImageBackground source={LogBackground} style={styles.container}>
      <View style={styles.container}>
        <Logo />
        <View style={styles.new}>
          <Text style={styles.welcome}>Welcome Sign Up</Text>

          <TextInput
            placeholder='Name'
            label='Name'
            style={styles.input}
            value={userData.name}
            onChangeText={(text) => setUserData({ ...userData, name: text })}
          />

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

          {error !== '' && <Text style={styles.error}>{error}</Text>}


          <Button
          onPress={userRegister}
          isLoading={stateBtn}
          isLoadingText="Creating an account"
          size="md"
          bgColor="green.wethu"
          //style={{ width: 200 }}
        >SIGN UP</Button>

          <TouchableOpacity onPress={() => navigation.navigate('Login')}>
            <Text style={styles.link}>Already Have An Account</Text>
          </TouchableOpacity>

          <View>
            <LogOption />
          </View>
        </View>
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
  },
  title: {
    fontSize: 25,
    fontWeight: 'bold',
    marginBottom: 20,
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
    color: 'green',
    marginLeft: 5,
    textAlign: 'center',
    marginBottom: 12,
    marginTop: 12,
    fontWeight: 'bold'
  },
  new: {
    padding: 23,
    borderRadius: 23,
    backgroundColor: 'white',
    opacity: 0.8
  },
  welcome: {
    fontSize: 18,
    fontWeight: 'bold',
    margin: 10,
  },
  error: {
    color: 'red',
    textAlign: 'center',
  },
});
