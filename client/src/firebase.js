// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey:  import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "jobportalalhamdulillah.firebaseapp.com",
  projectId: "jobportalalhamdulillah",
  storageBucket: "jobportalalhamdulillah.appspot.com",
  messagingSenderId: "882130388152",
  appId: "1:882130388152:web:667e48e729afca0a30604d",
  measurementId: "G-ZEW85687HP"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);