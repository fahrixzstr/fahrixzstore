// js/popup.js
// Order Popup Functions

import { db } from "./firebase.js";
import { collection, addDoc } from "https://www.gstatic.com/firebasejs/12.14.0/firebase-firestore.js";

/* =========================
   ADMIN NUMBER
========================= */

const adminNumber = "6285609949819";

/* =========================
   PRODUCT ACTIVE
========================= */

let currentProduct = null;

/* =========================
   OPEN POPUP
========================= */

export function openOrderPopup(product) {
  currentProduct = product;

  const quantity = product.quantity || 1;
  const total = product.harga * quantity;

  // tampil popup
  const popup = document.getElementById("popup-order");
  if (popup) {
    popup.style.display = "flex";
  }

  // isi detail
  const produkEl = document.getElementById("produk");
  const hargaEl = document.getElementById("harga");
  const quantityEl = document.getElementById("quantity");
  const orderIdEl = document.getElementById("orderId");
  const totalEl = document.getElementById("total");

  if (produkEl) produkEl.innerText = `: ${product.nama}`;
  if (hargaEl) hargaEl.innerText = `: Rp${product.harga.toLocaleString("id-ID")}`;
  if (quantityEl) quantityEl.innerText = `: x${quantity}`;
  if (orderIdEl) orderIdEl.innerText = `: ${product.id}`;
  if (totalEl) totalEl.innerText = `: Rp${total.toLocaleString("id-ID")}`;
}

/* =========================
   CLOSE POPUP
========================= */

export function closeOrderPopup() {
  const popup = document.getElementById("popup-order");
  if (popup) {
    popup.style.display = "none";
  }
  currentProduct = null;
}

/* =========================
   CREATE ORDER
========================= */

async function createOrder(product) {
  const quantity = product.quantity || 1;
  const total = product.harga * quantity;

  // DATA ORDER
  const orderData = {
    produk: product.nama,
    harga: product.harga,
    quantity: quantity,
    total: total,
    productId: product.id,
    status: "pending",
    createdAt: new Date().toISOString()
  };

  /* =========================
     SIMPAN KE FIREBASE
  ========================= */
  try {
    await addDoc(collection(db, "riwayat-order"), orderData);
    console.log("Order berhasil disimpan");
  } catch (error) {
    console.error(error);
    alert("Gagal menyimpan order");
    return;
  }

  /* =========================
     FORMAT WHATSAPP
  ========================= */
  const message = `
📦 *PESANAN BARU*

🛒 Produk : ${product.nama}
💰 Harga : Rp${product.harga.toLocaleString("id-ID")}
📦 Quantity : ${quantity}
🆔 ID : ${product.id}
💵 Total : Rp${total.toLocaleString("id-ID")}
📌 Status : Pending
  `.trim();

  const encodedMessage = encodeURIComponent(message);
  const whatsappUrl = `https://wa.me/${adminNumber}?text=${encodedMessage}`;

  /* =========================
     OPEN WHATSAPP
  ========================= */
  window.open(whatsappUrl, "_blank");
}

/* =========================
   EVENT BUTTON
========================= */

document.addEventListener("click", (e) => {
  if (e.target.classList.contains("btn-order")) {
    if (!currentProduct) return;
    createOrder(currentProduct);
  }
});

/* =========================
   CLOSE BACKGROUND
========================= */

document.addEventListener("click", (e) => {
  const popup = document.getElementById("popup-order");
  if (e.target === popup) {
    closeOrderPopup();
  }
});

/* =========================
   ESC CLOSE
========================= */

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    closeOrderPopup();
  }
});

/* =========================
   GLOBAL
========================= */

window.openOrderPopup = openOrderPopup;
window.closeOrderPopup = closeOrderPopup;

console.log("✅ Popup.js loaded!");
