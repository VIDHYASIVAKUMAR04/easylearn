import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyCZBzx06Bhwc4ALz_ce9YpZ0eG6uPuZDWk",
    authDomain: "login-90551.firebaseapp.com",
    projectId: "login-90551",
    storageBucket: "login-90551.firebasestorage.app",
    messagingSenderId: "22072929800",
    appId: "1:22072929800:web:3a3990e1f238f628916bbd",
    measurementId: "G-HHVBXJZPJ8"
  };

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);