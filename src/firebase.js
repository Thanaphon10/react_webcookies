// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBhSn7nrXPGpgJ4XW_a_E1n_EWF-1i6LzY",
  authDomain: "react-cookies.firebaseapp.com",
  projectId: "react-cookies",
  storageBucket: "react-cookies.appspot.com",
  messagingSenderId: "793019035782",
  appId: "1:793019035782:web:bb4653932a741daca1e107",
  measurementId: "G-WNN623QDVN"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const db = getFirestore(app)