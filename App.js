import registerNNPushToken from 'native-notify';
import { onAuthStateChanged, signOut } from "firebase/auth";
import { NavigationContainer } from '@react-navigation/native';
import AuthNavigator from './src/navigation/AuthNavigation.js';
import { AppNavigation } from './src/navigation/AppNavigation.js';

import { auth } from './firebase.js';
import { useState, createContext, useEffect } from "react";

export const UserContext = createContext()

function App() {
  // registerNNPushToken(12285, 'lOMiA9DsNGC6YkHbeAGF2q');

  const [user, setuser] = useState(null)

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setuser(user)
      } else {
        setuser(null)
      }
    });
  }, [user])

  const doLogout = () => {
    setuser(null);
    signOut(auth)
  }
  const doLogin = (data) => {
    setuser(data)
  }


  return (
    <UserContext.Provider value={{ user, doLogin, doLogout }}>
      <NavigationContainer>
        {user ? <AppNavigation /> : <AuthNavigator />}
      </NavigationContainer>
    </UserContext.Provider>
  );
}

export default App;
