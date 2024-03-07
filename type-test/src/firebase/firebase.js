// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
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

export {app, auth};
// const analytics = getAnalytics(app);