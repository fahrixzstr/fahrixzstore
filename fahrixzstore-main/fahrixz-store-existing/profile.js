import { initializeApp } from "https://www.gstatic.com/firebasejs/12.14.0/firebase-app.js";

import {
  getAuth,
  onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/12.14.0/firebase-auth.js";

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

// INIT FIREBASE
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// ELEMENT
const profileName = document.getElementById("profileName");

// CHECK LOGIN
onAuthStateChanged(auth, (user) => {

  if(user){

    profileName.innerText =
      user.displayName ||
      user.email ||
      "User";

  } else {

    profileName.innerText = "Masuk/Daftar";

  }

});