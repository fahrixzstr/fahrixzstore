// js/email.js
// Email Functions (Need SMTP Backend)

/* Send Email */
window.sendEmail = function(to, subject, body) {
  console.log(`Send email to: ${to}, subject: ${subject}`);
  alert('Email system ready!\n\nHubungkan ke backend SMTP untuk fitur lengkap.');
};

/* Contact Email */
window.contactEmail = function() {
  const name = document.getElementById('contactName').value;
  const email = document.getElementById('contactEmail').value;
  const message = document.getElementById('contactMessage').value;
  
  if (!name || !email || !message) {
    alert('Lengkapan data!');
    return;
  }
  
  window.sendEmail('fahrixz67@gmail.com', `Kontak dari ${name}`, message);
  alert('Email terkirim!');
};

console.log("✅ Email.js loaded!");