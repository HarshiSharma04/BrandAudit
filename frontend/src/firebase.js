// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDyFLvWaRBfR9_2blMrSjK1OMUrd7UOoYQ",
  authDomain: "blackcoffer-40349.firebaseapp.com",
  projectId: "blackcoffer-40349",
  storageBucket: "blackcoffer-40349.firebasestorage.app",
  messagingSenderId: "433134739748",
  appId: "1:433134739748:web:09b6e9c17f9231a7efd3b1",
  measurementId: "G-QV1XEZSJN6"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);


