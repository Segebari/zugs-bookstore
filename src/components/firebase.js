import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAiafJPq3sz-91iFHSPz_0zj2a26dujF9E",
  authDomain: "zugs-bookstore.firebaseapp.com",
  projectId: "zugs-bookstore",
  storageBucket: "zugs-bookstore.appspot.com",
  messagingSenderId: "232327405769",
  appId: "1:232327405769:web:2577bdd04cd5d1bc682d18",
  measurementId: "G-ZYQ60T1LXJ",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
