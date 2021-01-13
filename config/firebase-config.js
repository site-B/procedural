// config/fire-config.js

import firebase from 'firebase';

const firebaseConfig = {
    apiKey: "AIzaSyD1VhhQCfBcUawzg4_GwsUvbEMK5TBXFU4",
    authDomain: "procedural-47317.firebaseapp.com",
    projectId: "procedural-47317",
    storageBucket: "procedural-47317.appspot.com",
    messagingSenderId: "590248416974",
    appId: "1:590248416974:web:77c843fb3dfb263dd2229f"
  };
  
  try {
    firebase.initializeApp(firebaseConfig);
  } catch(err){
    if (!/already exists/.test(err.message)) {
      console.error('Firebase initialization error', err.stack)}
  }
  
  const fire = firebase;
  
  export default fire;