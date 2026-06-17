// js/reset.js
// Reset Password Functions

import { initializeApp } from "https://www.gstatic.com/firebasejs/12.14.0/firebase-app.js";
import { getAuth, sendPasswordResetEmail } from "https://www.gstatic.com/firebasejs/12.14.0/firebase-auth.js";

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

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

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

console.log("✅ Reset.js loaded!");