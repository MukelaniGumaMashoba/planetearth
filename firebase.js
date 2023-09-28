import { initializeApp } from "firebase/app";

import { initializeAuth, getReactNativePersistence } from 'firebase/auth';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';


const firebaseConfig = {
  apiKey: "AIzaSyBNbnsazXpoQ2DFYKVqwvixb8NKj1hX0Lw",
  authDomain: "plantplus-9d3e3.firebaseapp.com",
  projectId: "plantplus-9d3e3",
  storageBucket: "plantplus-9d3e3.appspot.com",
  messagingSenderId: "228859214332",
  appId: "1:228859214332:web:535f947f9ba2b7abb99a79"
};

const app = initializeApp(firebaseConfig);
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage)
});


export { auth }