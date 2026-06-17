// ========================================
// FAHRIXZ STORE - MAIN APP
// ========================================

console.log("✅ FahriXZ Store App Loaded!");

// Toast System
window.showToast = function(message, type = 'info') {
  const container = document.getElementById('toastContainer') || createToastContainer();
  const toast = document.createElement('div');
  toast.className = `toast ${type}`;
  const icons = { success: '✓', error: '✕', warning: '⚠', info: 'ℹ' };
  toast.innerHTML = `<span class="toast-icon">${icons[type] || 'ℹ'}</span><span>${message}</span>`;
  container.appendChild(toast);
  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateX(100px)';
    setTimeout(() => toast.remove(), 300);
  }, 4000);
};


function createToastContainer() {
  const container = document.createElement('div');
  container.className = 'toast-container';
  container.id = 'toastContainer';
  document.body.appendChild(container);
  return container;
}

// Generate Order ID - Format FXZ-ID2210 (14 chars)
window.generateOrderId = function() {
  const prefix = 'FXZ-ID2F2R3D';
  const timestamp = Date.now().toString(36).toUpperCase().slice(-4);
  const random = Math.random().toString(36).toUpperCase().slice(-4);
  return prefix + timestamp + random;
};

// Toggle Menu
window.toggleMenu = function() {
  const menu = document.getElementById('menuDropdown');
  if (menu) menu.classList.toggle('open');
};

// Toggle Wishlist
window.toggleWishlist = function() {
  location.href = 'profil.html';
};

// FAQ Toggle
window.toggleFaq = function(btn) {
  const item = btn.closest('.faq-item');
  if (!item) return;
  const wasOpen = item.classList.contains('open');
  document.querySelectorAll('.faq-item').forEach(i => i.classList.remove('open'));
  if (!wasOpen) item.classList.add('open');
};

// CS Widget
window.toggleCS = function() {
  const widget = document.getElementById('csWidget');
  const toggle = document.getElementById('csToggle');
  if (widget && toggle) {
    widget.classList.toggle('open');
    toggle.style.display = widget.classList.contains('open') ? 'none' : 'flex';
  }
};

window.csSend = function() {
  const input = document.getElementById('csInput');
  const body = document.getElementById('csBody');
  if (!input || !body) return;
  const msg = input.value.trim();
  if (!msg) return;
  body.innerHTML += `<div class="cs-message user"><p>${escapeHtml(msg)}</p></div>`;
  input.value = '';
  body.scrollTop = body.scrollHeight;
  setTimeout(() => {
    body.innerHTML += `<div class="cs-message bot"><p>Terima kasih! Tim kami akan segera merespons. Hubungi via WhatsApp untuk respon lebih cepat.</p></div>`;
    body.scrollTop = body.scrollHeight;
  }, 800);
};

window.csQuickReply = function(type) {
  const replies = {
    price: 'Silakan pilih produk untuk melihat harga terbaru. Harga kami selalu kompetitif dan terupdate!',
    process: 'Cara pesan: 1) Pilih produk 2) Klik Order 3) Pesan via WhatsApp 4) Transfer pembayaran 5) Proses otomatis',
    status: 'Silakan masukkan ID pesanan Anda di halaman Track untuk melihat status real-time.',
    payment: 'Kami menerima: Transfer Bank, Dana, OVO, GoPay, ShopeePay, QRIS, dan pembayaran via WhatsApp.'
  };
  const body = document.getElementById('csBody');
  if (body && replies[type]) {
    body.innerHTML += `<div class="cs-message bot"><p>${replies[type]}</p></div>`;
    body.scrollTop = body.scrollHeight;
  }
};

// Escape HTML
function escapeHtml(text) {
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}

// Copy to Clipboard
window.copyToClipboard = function(text, successMsg) {
  navigator.clipboard.writeText(text).then(() => {
    showToast(successMsg || 'Tersalin!', 'success');
  }).catch(() => {
    // Fallback
    const ta = document.createElement('textarea');
    ta.value = text;
    document.body.appendChild(ta);
    ta.select();
    document.execCommand('copy');
    document.body.removeChild(ta);
    showToast(successMsg || 'Tersalin!', 'success');
  });
};

// Share
window.shareContent = async function(data) {
  if (navigator.share) {
    try {
      await navigator.share(data);
    } catch (e) { /* cancelled */ }
  } else {
    copyToClipboard(data.url || data.text, 'Link disalin!');
  }
};

// Language
window.toggleLang = function() {
  const dropdown = document.getElementById('langDropdown');
  if (dropdown) dropdown.classList.toggle('open');
};

window.setLang = function(lang) {
  localStorage.setItem('language', lang);
  const dropdown = document.getElementById('langDropdown');
  if (dropdown) dropdown.classList.remove('open');
  document.querySelectorAll('.lang-option').forEach(o => {
    o.classList.toggle('active', o.dataset.lang === lang);
  });
  applyTranslations(lang);
  showToast('Language: ' + lang.toUpperCase(), 'success');
};

// Translations helper
window.applyTranslations = function(lang) {
  // Override in each page
};

// Install App
window.installApp = function() {
  if (window.deferredPrompt) {
    window.deferredPrompt.prompt();
    window.deferredPrompt.userChoice.then((choiceResult) => {
      if (choiceResult.outcome === 'accepted') {
        showToast('Aplikasi terinstall!', 'success');
      }
      window.deferredPrompt = null;
    });
  } else {
    showToast('Gunakan menu "Add to Home Screen" pada browser', 'info');
  }
};

// Close dropdowns on outside click
document.addEventListener('click', (e) => {
  if (!e.target.closest('.nav-icons') && !e.target.closest('.menu-dropdown') && !e.target.closest('.lang-dropdown')) {
    const menu = document.getElementById('menuDropdown');
    const lang = document.getElementById('langDropdown');
    if (menu) menu.classList.remove('open');
    if (lang) lang.classList.remove('open');
  }
});



// Keyboard shortcuts
document.addEventListener('keydown', (e) => {
  if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
    e.preventDefault();
    const searchInput = document.getElementById('searchInput');
    if (searchInput) searchInput.focus();
  }
  if (e.key === 'Escape') {
    const modal = document.getElementById('orderModal');
    if (modal) modal.classList.remove('active');
    const menu = document.getElementById('menuDropdown');
    if (menu) menu.classList.remove('open');
  }
});

console.log("✅ App.js fully loaded!");
