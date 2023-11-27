// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDe4XE9dyclPO1JGp0098eZNkByf0EnomE",
  authDomain: "otp-project-2adcf.firebaseapp.com",
  projectId: "otp-project-2adcf",
  storageBucket: "otp-project-2adcf.appspot.com",
  messagingSenderId: "755625875329",
  appId: "1:755625875329:web:137c142eb1f824bd003a80",
  measurementId: "G-K6WK56PBN8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app)
