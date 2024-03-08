// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-estate-app-4ccda.firebaseapp.com",
  projectId: "mern-estate-app-4ccda",
  storageBucket: "mern-estate-app-4ccda.appspot.com",
  messagingSenderId: "723028517164",
  appId: "1:723028517164:web:89980528f15522dc410c89",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
