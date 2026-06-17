// js/referral.js
// Referral Functions

/* Copy Referral Code */
window.copyReferral = function() {
  const input = document.querySelector('input[readonly]');
  if (!input) return;

  input.select();
  document.execCommand('copy');
  alert('Kode referral berhasil dicopy!');
};

/* Share to Social Media */
window.shareReferral = function(platform) {
  const code = document.getElementById('referralCode').value || 'FAHRIXZ';
  const message = `Gabung di FahriXz Store! Gunakan kode referral saya: ${code}`;
  const url = window.location.href;

  let shareUrl = '';
  switch (platform) {
    case 'whatsapp':
      shareUrl = `https://wa.me/?text=${encodeURIComponent(message)}`;
      break;
    case 'facebook':
      shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}&quote=${encodeURIComponent(message)}`;
      break;
    case 'twitter':
      shareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(message)}`;
      break;
    default:
      return;
  }

  window.open(shareUrl, '_blank');
};

console.log("✅ Referral.js loaded!");