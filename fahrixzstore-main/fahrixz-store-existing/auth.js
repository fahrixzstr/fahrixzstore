// js/auth.js
// Authentication Functions
import {
  auth,
  googleProvider
} from './firebase.js';
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.14.0/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider, sendEmailVerification, sendPasswordResetEmail } from "https://www.gstatic.com/firebasejs/12.14.0/firebase-auth.js";


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



/* Register with Email */
window.registerUser = async function() {
  const name = document.getElementById('registerName').value;
  const email = document.getElementById('registerEmail').value;
  const password = document.getElementById('registerPassword').value;

  if (!name || !email || !password) {
    alert('Lengkapi semua data!');
    return;
  }

  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    await sendEmailVerification(userCredential.user);
    alert('Akun berhasil dibuat! Cek email untuk verifikasi.');
    window.location.href = 'login.html';
  } catch (error) {
    alert('Gagal: ' + error.message);
  }
};

/* Login with Email */
window.loginUser = async function() {
  const email = document.getElementById('loginEmail').value;
  const password = document.getElementById('loginPassword').value;

  if (!email || !password) {
    alert('Isi email dan password!');
    return;
  }

  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    
    if (!userCredential.user.emailVerified) {
      alert('Verifikasi email terlebih dahulu!');
      return;
    }
    
    alert('Login berhasil!');
    window.location.href = 'user.html';
  } catch (error) {
    alert('Login gagal: ' + error.message);
  }
};

/* Login with Google */
window.googleLogin = async function() {
  try {
    await signInWithPopup(auth, googleProvider);
    alert('Login dengan Google berhasil!);
    window.location.href = 'user.html';
  } catch (error) {
    alert('Login Google gagal: ' + error.message);
  }
};

/* Reset Password */
window.resetPassword = async function() {
  const email = document.getElementById('resetEmail').value;
  
  if (!email) {
    alert('Masukkan email!');
    return;
  }

  try {
    await sendPasswordResetEmail(auth, email);
    alert('Link reset password dikirim ke email!');
    window.location.href = 'login.html';
  } catch (error) {
    alert('Gagal: ' + error.message);
  }
};

console.log("✅ Auth.js loaded!");