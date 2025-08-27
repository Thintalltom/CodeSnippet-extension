// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB_2UTh4hak6JUaXbx7E90ZtiYan_MbLV0",
  authDomain: "youthup-89ad2.firebaseapp.com",
  projectId: "youthup-89ad2",
  storageBucket: "youthup-89ad2.firebasestorage.app",
  messagingSenderId: "1061061782870",
  appId: "1:1061061782870:web:3514018683b814250e7af7",
  measurementId: "G-LVYMYVS96P"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
export const auth = getAuth(app);