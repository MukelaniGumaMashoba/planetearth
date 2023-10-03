import auth from '@react-native-firebase/auth';
import { GoogleSignin } from '@react-native-google-signin/google-signin';

GoogleSignin.configure({
  webClientId: 'YOUR_WEB_CLIENT_ID', 
});

async function signInWithGoogle() {
  try {
    await GoogleSignin.hasPlayServices();
    const userInfo = await GoogleSignin.signIn();
    const { idToken, accessToken } = userInfo;

    const googleCredential = auth.GoogleAuthProvider.credential(idToken, accessToken);

    const userCredential = await auth().signInWithCredential(googleCredential);

    const user = userCredential.user;
    console.log('Google Sign-In Successful!', user);
    
  } catch (error) {
    if (error.code === statusCodes.SIGN_IN_CANCELLED) {
      console.log('Google Sign-In Cancelled');
    } else if (error.code === statusCodes.IN_PROGRESS) {
      console.log('Google Sign-In In Progress');
    } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
      console.log('Google Play Services Not Available');
    } else {
      console.log('Error:', error.message);
    }
  }
}
