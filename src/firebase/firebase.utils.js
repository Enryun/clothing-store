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
  };

export const createUserProfileDocument = async (userAuth, additionData) => {
  if (!userAuth) return;
  
  const userRef = firestore.doc(`user/${userAuth.uid}`);

  const snapShot = await userRef.get();

  if (!snapShot.exists) {
    const {displayName, email} = userAuth;
    const createdAt = new Date();

    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionData
      })
    } catch (error) {
      console.log('error create user', error.message);
    }
  }

  return userRef;
}

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({prompt: 'select_account'});
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;


