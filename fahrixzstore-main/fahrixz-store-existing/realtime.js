// js/realtime.js
// Real-time Functions

import { initializeApp } from "https://www.gstatic.com/firebasejs/12.14.0/firebase-app.js";
import { getDatabase, ref, onValue } from "https://www.gstatic.com/firebasejs/12.14.0/firebase-database.js";

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
const db = getDatabase(app);

/* Listen Stats */
window.listenStats = function(callback) {
  onValue(ref(db, 'stats/'), snapshot => {
    callback(snapshot.val());
  });
};

/* Update Stats */
window.updateStats = function(stats) {
  console.log('Updating stats:', stats);
};

/* Real-time Order Count */
window.listenOrderCount = function() {
  onValue(ref(db, 'orders/'), snapshot => {
    const data = snapshot.val();
    const count = data ? Object.keys(data).length : 0;
    document.getElementById('orderCount').textContent = count;
  });
};

/* Real-time Revenue */
window.listenRevenue = function() {
  onValue(ref(db, 'orders/'), snapshot => {
    const data = snapshot.val();
    let total = 0;
    if (data) {
      for (let id in data) {
        total += parseInt(data[id].price || 0);
      }
    }
    document.getElementById('totalRevenue').textContent = 'Rp ' + total.toLocaleString();
  });
};

console.log("✅ Realtime.js loaded!");