// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

import ReactNativeAsyncStorage from "@react-native-async-storage/async-storage";
import { initializeAuth, getReactNativePersistence } from "firebase/auth";
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA_eaglnO3QVBimJJ3GmHkVEAnA7VeWI5I",
  authDomain: "webrazzitask.firebaseapp.com",
  projectId: "webrazzitask",
  storageBucket: "webrazzitask.appspot.com",
  messagingSenderId: "52633382078",
  appId: "1:52633382078:web:7403390a77489ac6d882ef",
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Save auth instances to AsyncStorage
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage),
});

// Initialize Firebase

export { auth };
