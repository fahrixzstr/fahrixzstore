// js/captcha.js
// Simple Captcha

const captchaText = document.getElementById('captchaText');
const captchaInput = document.getElementById('captchaInput');
let currentCaptcha = '';

window.generateCaptcha = function() {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  let result = '';
  
  for (let i = 0; i < 5; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  
  currentCaptcha = result;
  
  if (captchaText) {
    captchaText.innerHTML = result;
  }
};

window.validateCaptcha = function() {
  if (captchaInput.value.toUpperCase() !== currentCaptcha) {
    alert('Captcha salah!');
    generateCaptcha();
    return false;
  }
  return true;
};

document.addEventListener('DOMContentLoaded', generateCaptcha);

console.log("✅ Captcha.js loaded!");