import Logo from '../components/Logo.js';
import { auth } from '../../firebase.js';
import { UserContext } from '../../userCtxt.js';
import React, { useContext, useState } from 'react'
import { signInWithEmailAndPassword } from 'firebase/auth';
import { TouchableOpacity, StyleSheet, View, Text, TextInput, Alert, ImageBackground } from 'react-native';
import LogOption from '../components/LogOption.js';
import { Button } from "native-base";

// Import your LogBack.jpg image
import LogBackground from '../assets/LogBack.jpg';
import { IconButton } from 'native-base';

export default function Log({ navigation }) {
  const { doLogin } = useContext(UserContext);
  const [error, setErrorMessage] = useState('');
  const [userData, setUserData] = useState({ email: "", password: "" })
  const [stateBtn, setBtnState] = useState(false)

  const userLogin = () => {
    setBtnState(true)
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

    signInWithEmailAndPassword(auth, userData.email, userData.password)
      .then((userCredential) => {
        const user = userCredential.user;
        doLogin(user)
      })
      .catch((error) => {
        const errorMessage = error.message;
        console.log(errorMessage)
        Alert.alert(errorMessage)
      }).finally(() => setBtnState(false));
  }

  return (
    <ImageBackground source={LogBackground} style={styles.container}>
      <Logo style={styles.ogo} />
      <View style={styles.new}>
        <Text style={styles.title}>Welcome Back! 👋</Text>
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
        <View style={styles.forgotPassword}>
          <TouchableOpacity
            onPress={() => navigation.navigate('ResetPasswordScreen')}
          >
            <Text style={styles.forgot}>Forgot your password ?</Text>
          </TouchableOpacity>
        </View>

        <Button
          onPress={userLogin}
          isLoading={stateBtn}
          isLoadingText="Authenticating"
          size="md"
          bgColor="green.wethu"
          //style={{ width: 200 }}
        >LOGIN</Button>

        


        <View>
          <TouchableOpacity onPress={() => navigation.navigate('Register')}>
            <Text style={[styles.link, styles.acc]}>Don't have an account? Sign up</Text>
          </TouchableOpacity>
        </View>
        <LogOption />
        <Button
         variant="outline" 
          isDisabled={stateBtn}
          size="md"
          onPress={() => {
            navigation.navigate('AdminLog')
          }}
          colorScheme="green.wethu"

          mt={10}
        >ADMIN</Button>
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
