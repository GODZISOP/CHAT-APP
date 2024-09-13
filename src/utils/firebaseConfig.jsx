import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDzi-mrtRJhGPNpga--COhRO1KD7g5dXyw",
  authDomain: "loginweb-ad483.firebaseapp.com",
  databaseURL: "https://loginweb-ad483-default-rtdb.firebaseio.com",
  projectId: "loginweb-ad483",
  storageBucket: "loginweb-ad483.appspot.com",
  messagingSenderId: "521134579828",
  appId: "1:521134579828:web:b7ce960f023fa3191df121"


};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);