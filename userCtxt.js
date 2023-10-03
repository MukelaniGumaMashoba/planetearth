import { onAuthStateChanged, signOut } from "firebase/auth";

import { auth } from './firebase.js';
import { useState, createContext, useEffect } from "react";

export const UserContext = createContext()

function UserContextWrapper({children}) {

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
      {children}
    </UserContext.Provider>
  );
}

export default UserContextWrapper;
