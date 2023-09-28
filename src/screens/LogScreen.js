import Logo from '../components/Logo.js';
import { auth } from '../../firebase.js';
import { UserContext } from '../../App.js';
import React, { useContext, useState } from 'react'
import { signInWithEmailAndPassword } from 'firebase/auth';
import { TouchableOpacity, StyleSheet, View, Text, TextInput, Button } from 'react-native'


export default function Log({ navigation }) {
  const { doLogin } = useContext(UserContext);

  const [userData, setUserData] = useState({ email: "", password: "" })

  const userLogin = () => {
    // Validation here
    if (!userData.email || !userData.password) {
      setErrorMessage("Please enter both email and password.");
      return;
    }
    if (!userData.password) {
      setErrorMessage("Please enter your password");
      return;
    }

    signInWithEmailAndPassword(auth, userData.email, userData.password)
      .then((userCredential) => {
        const user = userCredential.user;
        doLogin(user)
      })
      .catch((error) => {
        const errorMessage = error.message;
        console.log(errorMessage)
      });
  }


  return (
    <View style={styles.container}>
      <Logo style={styles.ogo} />
      <View style={styles.new}>
        <Text style={styles.title}>Welcome Back</Text>

        <TextInput
          placeholder='Email'
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
          placeholder='Password'
          label="Password"
          returnKeyType="done" style={styles.input}
          secureTextEntry
          value={userData.password}
          onChangeText={(text) => { setUserData({ ...userData, password: text }) }}
        />
        <View style={styles.forgotPassword}>
          <TouchableOpacity
            onPress={() => navigation.navigate('ResetPasswordScreen')}
          >
            <Text style={styles.forgot}>Forgot your password ?</Text>
          </TouchableOpacity>
        </View>
        <Button mode="contained" title='Log in' onPress={userLogin} />
        <View style={styles.row}>
          <Text>You do not have an account yet ?</Text>
        </View>
        <View style={styles.row}>
          <TouchableOpacity onPress={() => navigation.navigate('Register')}>
            <Text style={styles.link}>Create Account</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  )
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
    fontFamily: 'Roboto',
    backgroundColor: 'lightgreen'
  },
  title: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 15,
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
  },
  new: {
    borderWidth: 1,
    padding: 23,
    borderRadius: 23,
    backgroundColor: 'white'
  }
});









































