import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"
import { initializeAuth, getReactNativePersistence } from 'firebase/auth';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

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
const db = getFirestore(app)
const fbStorage = getStorage();


/**
 *
 * @param {*} uri
 * @param {*} name
 */
const UploadImages = async (uri, name, onProgress) => {
  const fetchResponse = await fetch(uri);
  const theBob = await fetchResponse.blob();
  theBob
  console.log(theBob)

  const imageRef = ref(getStorage(), `images/${name}`);
  const uploadTask = uploadBytesResumable(imageRef, theBob);


  return new Promise((resolve, reject) => {
    uploadTask.on('state_changed',
      (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        onProgress?.(progress)
      },
      (error) => {
        // Handle unsuccessful uploads
        reject(error)
      },
      async () => {
        const downloadUrl = await getDownloadURL(uploadTask.snapshot.ref)
        resolve({
          downloadUrl,
          metaData: uploadTask.snapshot.metadata
        })
      }

    );
  });
};



export { auth, db, UploadImages, fbStorage }