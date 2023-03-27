// For Firebase JS SDK v7.20.0 and later, measurementId is optional
import firebase from 'firebase/compat/app';
import "firebase/compat/firestore";
import "firebase/compat/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDEUxNOmA16oatplwn7UCbnbiTldjI4AkA",
  authDomain: "signal-clone-4e6a7.firebaseapp.com",
  projectId: "signal-clone-4e6a7",
  storageBucket: "signal-clone-4e6a7.appspot.com",
  messagingSenderId: "1072882871950",
  appId: "1:1072882871950:web:820b8809bc08e282f4a3df",
  measurementId: "G-NF6KVL01YD"
};

let app;
if(firebase.apps.length === 0){
  app = firebase.initializeApp(firebaseConfig);
}
else{
  app = firebase.app();
}

const db = app.firestore();
const auth = firebase.auth();

export {db, auth};
