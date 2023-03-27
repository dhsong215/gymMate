import {GoogleSignin} from '@react-native-google-signin/google-signin';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

GoogleSignin.configure({
  webClientId:
    '977437828137-69tiaituq1rb6ct7thla85dkitp728se.apps.googleusercontent.com',
});

export {firestore, auth, GoogleSignin};
