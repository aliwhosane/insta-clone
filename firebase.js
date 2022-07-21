// Import the functions you need from the SDKs you need
import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore } from "@firebase/firestore";
import { getStorage } from "@firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDIgBbbevYtRxc-dm3bTQ9czNTzV5xf7Cg",
  authDomain: "insta-clone-2a922.firebaseapp.com",
  projectId: "insta-clone-2a922",
  storageBucket: "insta-clone-2a922.appspot.com",
  messagingSenderId: "284692276634",
  appId: "1:284692276634:web:a72857c5a8edfb33468623",
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore();
const storage = getStorage();

export { app, db, storage };
