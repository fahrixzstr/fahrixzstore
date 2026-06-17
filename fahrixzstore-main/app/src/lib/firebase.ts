import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, signInWithEmailAndPassword, createUserWithEmailAndPassword, signInWithPopup, signOut, onAuthStateChanged, sendPasswordResetEmail } from 'firebase/auth';
import { getFirestore, collection, addDoc, getDocs, doc, getDoc, setDoc, updateDoc, deleteDoc, query, where, orderBy, limit, onSnapshot, serverTimestamp, Timestamp, startAfter, increment, arrayUnion } from 'firebase/firestore';
import { getStorage, ref as storageRef, uploadBytes, getDownloadURL } from 'firebase/storage';
import { getAnalytics } from 'firebase/analytics';

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

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
export const analytics = getAnalytics(app);
export const googleProvider = new GoogleAuthProvider();

export {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInWithPopup,
  signOut,
  onAuthStateChanged,
  sendPasswordResetEmail,
  collection,
  addDoc,
  getDocs,
  doc,
  getDoc,
  setDoc,
  updateDoc,
  deleteDoc,
  query,
  where,
  orderBy,
  limit,
  onSnapshot,
  serverTimestamp,
  Timestamp,
  startAfter,
  increment,
  arrayUnion,
  storageRef,
  uploadBytes,
  getDownloadURL
};

// Admin credentials from .env
export const ADMIN_EMAIL = 'fahriiandriansaputra@gmail.com';
export const ADMIN_PASSWORD = 'fahrixzstoreadmin56';

console.log('Firebase initialized');
