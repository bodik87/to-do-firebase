import { initializeApp } from "firebase/app";
import { GoogleAuthProvider, getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const API_KEY = import.meta.env.VITE_API_KEY;

const firebaseConfig = {
  apiKey: API_KEY,
  authDomain: "todo-b9a20.firebaseapp.com",
  projectId: "todo-b9a20",
  storageBucket: "todo-b9a20.appspot.com",
  messagingSenderId: "64379544315",
  appId: "1:64379544315:web:6b4f14fbdd9c4da08c065e",
};

const app = initializeApp(firebaseConfig);
export const googleAuthProvider = new GoogleAuthProvider();
export const auth = getAuth(app);
export const db = getFirestore(app);
export default app;
