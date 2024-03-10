// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCJzLZwwhY_4QbM0IaLirnTkeHlfTNiqkQ",
  authDomain: "typerabbit-28fc0.firebaseapp.com",
  projectId: "typerabbit-28fc0",
  storageBucket: "typerabbit-28fc0.appspot.com",
  messagingSenderId: "1093924023578",
  appId: "1:1093924023578:web:f6076b72e1865135e150a3",
  measurementId: "G-8T0X4GLRH0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();
export { auth, googleProvider };
