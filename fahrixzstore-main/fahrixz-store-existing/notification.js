import { initializeApp } from "https://www.gstatic.com/firebasejs/12.14.0/firebase-app.js";

import {
  getDatabase,
  ref,
  onValue
} from "https://www.gstatic.com/firebasejs/12.14.0/firebase-database.js";

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
const db = getDatabase(app);

// ELEMENT
const notificationList =
  document.getElementById("notificationList");

const emptyState =
  document.getElementById("emptyState");

// REALTIME NOTIFICATION
const notificationsRef =
  ref(db, "notifications");

// LISTEN REALTIME
onValue(notificationsRef, (snapshot) => {

  notificationList.innerHTML = "";

  if(!snapshot.exists()){

    emptyState.style.display = "block";

    return;
  }

  emptyState.style.display = "none";

  const data = snapshot.val();

  // OBJECT TO ARRAY
  const notifications =
    Object.entries(data).reverse();

  notifications.forEach(([id, notif]) => {

    const item =
      document.createElement("div");

    item.className = "notification-item";

    item.innerHTML = `
    
      <div class="notification-title">
        ${notif.title || "Notifikasi"}
      </div>

      <div class="notification-desc">
        ${notif.description || "-"}
      </div>

      <div class="notification-date">
        ${notif.date || ""}
      </div>

    `;

    notificationList.appendChild(item);

  });

});