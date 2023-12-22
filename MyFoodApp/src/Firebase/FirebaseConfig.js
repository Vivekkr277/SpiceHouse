// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import {getFirestore} from  'firebase/firestore';
import {getStorage} from 'firebase/storage';
import {getFirestore} from 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyDnI0ne2IeBEk2HnS_IaL_VAQSrjPMpZGQ",
  authDomain: "foodapp-c2949.firebaseapp.com",
  projectId: "foodapp-c2949",
  storageBucket: "foodapp-c2949.appspot.com",
  messagingSenderId: "256466767280",
  appId: "1:256466767280:web:707b6000797559998d5a75"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);

export {storage, db} ;