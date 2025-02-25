// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCO50EI1L4uq7HnwNWe5mn9360AwFZoxss",
  authDomain: "gerenciador-de-estoques-51e76.firebaseapp.com",
  projectId: "gerenciador-de-estoques-51e76",
  storageBucket: "gerenciador-de-estoques-51e76.firebasestorage.app",
  messagingSenderId: "981950568944",
  appId: "1:981950568944:web:8ec112b64e60ead5cf2535",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { app, db };
