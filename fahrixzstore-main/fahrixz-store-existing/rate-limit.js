// js/rate-limit.js
// Rate Limiter untuk Login

let loginAttempts = 0;
let lockedUntil = null;
const MAX_ATTEMPTS = 5;
const LOCK_DURATION = 5 * 60 * 1000; // 5 minutes

window.checkRateLimit = function() {
  const now = Date.now();

  // Check if locked
  if (lockedUntil && now < lockedUntil) {
    const remaining = Math.ceil((lockedUntil - now) / 1000);
    const minutes = Math.floor(remaining / 60);
    const seconds = remaining % 60;

    showToast(`Terlalu banyak percobaan. Coba lagi dalam ${minutes}m ${seconds}d.`, 'error');
    return false;
  }

  // Clear lock if expired
  if (lockedUntil && now >= lockedUntil) {
    lockedUntil = null;
    loginAttempts = 0;
  }

  return true;
};

window.recordFailedAttempt = function() {
  loginAttempts++;

  // Update UI
  const attemptsEl = document.getElementById('loginAttempts');
  if (attemptsEl) {
    attemptsEl.textContent = `Percobaan: ${loginAttempts}/${MAX_ATTEMPTS}`;
    if (loginAttempts >= MAX_ATTEMPTS - 2) {
      attemptsEl.classList.add('danger');
    }
  }

  if (loginAttempts >= MAX_ATTEMPTS) {
    // Lock for 5 minutes
    lockedUntil = Date.now() + LOCK_DURATION;
    loginAttempts = 0;

    showToast('Akun terkunci sementara karena terlalu banyak percobaan login. Coba lagi dalam 5 menit.', 'error');

    // Show warning
    const warning = document.getElementById('rateLimitWarning');
    if (warning) {
      warning.classList.add('show');
      startLockTimer();
    }

    return false;
  }

  return true;
};

window.resetRateLimit = function() {
  loginAttempts = 0;
  lockedUntil = null;

  const attemptsEl = document.getElementById('loginAttempts');
  if (attemptsEl) {
    attemptsEl.textContent = '';
    attemptsEl.classList.remove('danger');
  }

  const warning = document.getElementById('rateLimitWarning');
  if (warning) {
    warning.classList.remove('show');
  }
};

function startLockTimer() {
  const timerEl = document.getElementById('lockTimer');
  if (!timerEl) return;

  const interval = setInterval(() => {
    const now = Date.now();
    const remaining = lockedUntil - now;

    if (remaining <= 0) {
      clearInterval(interval);
      resetRateLimit();
      return;
    }

    const minutes = Math.floor(remaining / 60000);
    const seconds = Math.floor((remaining % 60000) / 1000);
    timerEl.textContent = `${minutes}:${seconds.toString().padStart(2, '0')}`;
  }, 1000);
}

console.log("✅ Rate-limit.js loaded!");
