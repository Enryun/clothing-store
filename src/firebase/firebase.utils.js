import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
    apiKey: "AIzaSyCsYU0ldRL3b_QdwM_nVPcktEMapvJdkbQ",
    authDomain: "crown-5dcf7.firebaseapp.com",
    databaseURL: "https://crown-5dcf7.firebaseio.com",
    projectId: "crown-5dcf7",
    storageBucket: "",
    messagingSenderId: "228707222020",
    appId: "1:228707222020:web:416a397ea26a6eff"
  }

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({prompt: 'select_account'});
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;