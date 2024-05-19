// Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
// import firebase from 'firebase/app';
// import 'firebase/firestore';
// import 'firebase/compat/firestore';

import "firebase/compat/auth";
import "firebase/compat/firestore"
import firebase from 'firebase/compat/app';



const firebaseConfig = {
  apiKey: "AIzaSyDnI0ne2IeBEk2HnS_IaL_VAQSrjPMpZGQ",
  authDomain: "foodapp-c2949.firebaseapp.com",
  projectId: "foodapp-c2949",
  storageBucket: "foodapp-c2949.appspot.com",
  messagingSenderId: "256466767280",
  appId: "1:256466767280:web:707b6000797559998d5a75"
};


if(!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
  // let firestore = firebase.firestore();
  // add later by me
  firebase.firestore().settings({ experimentalForceLongPolling: true });
}

export { firebase };