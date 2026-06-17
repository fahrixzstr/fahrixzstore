// js/firebase.js
// Firebase Configuration - Central Module

import { initializeApp } from "https://www.gstatic.com/firebasejs/12.14.0/firebase-app.js";
import { getDatabase, ref, push, set, onValue, remove, update, serverTimestamp } from "https://www.gstatic.com/firebasejs/12.14.0/firebase-database.js";
import { getAuth, signInWithEmailAndPassword, signInWithPopup, createUserWithEmailAndPassword, signOut, onAuthStateChanged, GoogleAuthProvider, sendPasswordResetEmail, sendEmailVerification } from "https://www.gstatic.com/firebasejs/12.14.p/firebase-auth.js";
import { getStorage, ref as storageRef, uploadBytes, getDownloadURL } from "https://www.gstatic.com/firebasejs/12.14.0/firebase-storage.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/12.14.0/firebase-analytics.js";
import { getFirestore, collection, addDoc, getDocs, query, where, doc, getDoc, updateDoc, deleteDoc, onSnapshot } from "https://www.gstatic.com/firebasejs/12.14.0/firebase-firestore.js";

  // Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  const firebaseConfig = {
    apiKey: "AIzaSyDjSUSuUWl6GOh_vJ-GnYV1tvguv0_pRXI",
    authDomain: "fahrixzstore.firebaseapp.com",
    databaseURL: "https://fahrixzstore-default-rtdb.firebaseio.com",
    projectId: "fahrixzstore",
    storageBucket: "fahrixzstore.firebasestorage.app",
    messagingSenderId: "1070736619563",
    appId: "1:1070736619563:web:735cdd57d5c90373e1526e",
    measurementId: "G-H7QL79SSMX"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);
const auth = getAuth(app);
const storage = getStorage(app);
const analytics = getAnalytics(app);
const firestore = getFirestore(app);
const googleProvider = new GoogleAuthProvider();

// Export semua modules
export { 
  app, db, auth, storage, analytics, firestore, googleProvider, 
  ref, push, set, onValue, remove, update, serverTimestamp, 
  storageRef, uploadBytes, getDownloadURL, 
  signInWithEmailAndPassword, signInWithPopup, createUserWithEmailAndPassword, 
  signOut, onAuthStateChanged, sendPasswordResetEmail, sendEmailVerification,
  collection, addDoc, getDocs, query, where, doc, getDoc, updateDoc, deleteDoc, onSnapshot
};

console.log("✅ Firebase Central Loaded!");
