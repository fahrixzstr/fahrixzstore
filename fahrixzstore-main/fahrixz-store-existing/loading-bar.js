// js/loading-bar.js
// Loading Bar

const loadingBarConfig = {
  height: '3px',
  color: '#00d9ff',
  duration: 500
};

function createLoadingBar() {
  const existing = document.getElementById('topLoadingBar');
  if (existing) existing.remove();

  const loadingBar = document.createElement('div');
  loadingBar.id = 'topLoadingBar';
  Object.assign(loadingBar.style, {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '0%',
    height: loadingBarConfig.height,
    background: `linear-gradient(90deg, ${loadingBarConfig.color}, #667eea)`,
    zIndex: 99999,
    transition: 'width 0.3s ease-in-out'
  });

  document.body.appendChild(loadingBar);
  return loadingBar;
}

window.startLoadingBar = function() {
  const loadingBar = createLoadingBar();
  requestAnimationFrame(() => {
    loadingBar.style.width = '80%';
  });
};

window.completeLoadingBar = function() {
  const loadingBar = document.getElementById('topLoadingBar');
  if (!loadingBar) return;

  loadingBar.style.width = '100%';
  setTimeout(() => {
    loadingBar.style.opacity = '0';
    setTimeout(() => loadingBar.remove(), loadingBarConfig.duration);
  }, 200);
};

window.failLoadingBar = function() {
  const loadingBar = document.getElementById('topLoadingBar');
  if (!loadingBar) return;

  loadingBar.style.background = 'linear-gradient(90deg, #ef4444, #dc2626)';
  loadingBar.style.width = '100%';
  setTimeout(() => {
    loadingBar.style.opacity = '0';
    setTimeout(() => loadingBar.remove(), loadingBarConfig.duration);
  }, 500);
};

// Fetch interceptor
const originalFetch = window.fetch;
window.fetch = async function(...args) {
  startLoadingBar();
  try {
    const response = await originalFetch.apply(this, args);
    completeLoadingBar();
    return response;
  } catch (error) {
    failLoadingBar();
    throw error;
  }
};

console.log("✅ Loading-bar.js loaded!");