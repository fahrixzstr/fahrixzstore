
  // Import the functions you need from the SDKs you need
  import { initializeApp } from "https://www.gstatic.com/firebasejs/12.14.0/firebase-app.js";
  import { getAnalytics } from "https://www.gstatic.com/firebasejs/12.14.0/firebase-analytics.js";
  // TODO: Add SDKs for Firebase products that you want to use
  // https://firebase.google.com/docs/web/setup#available-libraries

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
  const analytics = getAnalytics(app);


/* Track Visitor */
window.trackVisitor = function() {
  logEvent(analytics, 'page_view');
  console.log("📊 Visitor tracked!");
};

/* Track Event */
window.trackEvent = function(eventName, params = {}) {
  logEvent(analytics, eventName, params);
  console.log(`📊 Event tracked: ${eventName}`);
};

/* Track Product View */
window.trackProductView = function(productName, price) {
  logEvent(analytics, 'view_item', {
    currency: 'IDR',
    value: parseInt(price),
    items: [{ item_name: productName }]
  });
};

/* Track Add to Cart */
window.trackAddToCart = function(productName, price) {
  logEvent(analytics, 'add_to_cart', {
    currency: 'IDR',
    value: parseInt(price),
    items: [{ item_name: productName }]
  });
};

/* Track Purchase */
window.trackPurchase = function(orderId, total) {
  logEvent(analytics, 'purchase', {
    currency: 'IDR',
    value: total,
    transaction_id: orderId
  });
};

// Auto track on load
document.addEventListener('DOMContentLoaded', () => {
  trackVisitor();
});

console.log("✅ Analytics.js loaded!");