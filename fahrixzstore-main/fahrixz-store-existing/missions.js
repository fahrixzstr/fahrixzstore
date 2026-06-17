import { initializeApp } from "https://www.gstatic.com/firebasejs/12.14.0/firebase-app.js";

import {
  getDatabase,
  ref,
  onValue
} from "https://www.gstatic.com/firebasejs/12.14.0/firebase-database.js";

// ===================================
// FIREBASE CONFIG
// ===================================

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

// ===================================
// INIT FIREBASE
// ===================================

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

// ===================================
// ELEMENT
// ===================================

const missionContainer = document.getElementById("missionContainer");
const saldoText = document.getElementById("saldoText");

// ===================================
// LOAD SALDO
// ===================================

const saldoRef = ref(db, "missionsSaldo");

onValue(saldoRef, (snapshot) => {

  if(snapshot.exists()){
    saldoText.innerText = snapshot.val();
  }

});

// ===================================
// LOAD MISSIONS
// ===================================

const missionRef = ref(db, "missions");

onValue(missionRef, (snapshot) => {

  missionContainer.innerHTML = "";

  if(!snapshot.exists()){

    missionContainer.innerHTML = `
    
      <div class="empty">

        <img src="assets/image/empty.png">

        <h3>Yah misi masih kosong</h3>

        <p>Belum ada misi tersedia saat ini.</p>

      </div>

    `;

    return;
  }

  const data = snapshot.val();

  const missions = Object.values(data).reverse();

  missions.forEach((mission) => {

    missionContainer.innerHTML += `
    
      <div class="mission-card">

        <div class="mission-top">

          <div class="mission-title">
            ${mission.title}
          </div>

          <div class="mission-reward">
            +${mission.reward}
          </div>

        </div>

        <div class="mission-desc">
          ${mission.description}
        </div>

        <button class="mission-btn">
          Kerjakan Misi
        </button>

      </div>

    `;
  });

});