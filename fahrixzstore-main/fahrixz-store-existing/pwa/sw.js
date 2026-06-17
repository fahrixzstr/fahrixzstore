// FahriXZ Store - Service Worker
const CACHE_NAME = 'fahrixz-v2';
const ASSETS_TO_CACHE = [
  '/',
  '/index.html',
  '/login.html',
  '/register.html',
  '/profil.html',
  '/product.html',
  '/order.html',
  '/notification.html',
  '/referral.html',
  '/tracking.html',
  '/settings.html',
  '/history.html',
  '/missions.html',
  '/css/style.css',
  '/css/animation.css',
  '/js/app.js',
  '/js/product.js',
  '/js/search.js',
  '/assets/logo.png',
  '/assets/logo.svg'
];

// Install event - cache assets
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('[SW] Caching assets');
        return cache.addAll(ASSETS_TO_CACHE);
      })
      .catch((err) => console.log('[SW] Cache failed:', err))
  );
  self.skipWaiting();
});

// Activate event - clean old caches
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames
          .filter((name) => name !== CACHE_NAME)
          .map((name) => caches.delete(name))
      );
    })
  );
  self.clients.claim();
});

// Fetch event - serve from cache or network
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        // Return cached version or fetch from network
        if (response) {
          return response;
        }
        return fetch(event.request)
          .then((networkResponse) => {
            // Don't cache if not valid
            if (!networkResponse || networkResponse.status !== 200 || networkResponse.type !== 'basic') {
              return networkResponse;
            }
            // Clone and cache the response
            const responseToCache = networkResponse.clone();
            caches.open(CACHE_NAME).then((cache) => {
              cache.put(event.request, responseToCache);
            });
            return networkResponse;
          })
          .catch(() => {
            // Offline fallback
            if (event.request.mode === 'navigate') {
              return caches.match('/index.html');
            }
          });
      })
  );
});

// Push notification support
self.addEventListener('push', (event) => {
  const options = {
    body: event.data?.text() || 'Pemberitahuan baru dari FahriXZ Store',
    icon: '/assets/logo.png',
    badge: '/assets/logo.png',
    tag: 'fahrixz-notification',
    requireInteraction: true,
    actions: [
      { action: 'open', title: 'Buka' },
      { action: 'close', title: 'Tutup' }
    ]
  };
  event.waitUntil(
    self.registration.showNotification('FahriXZ Store', options)
  );
});

self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  if (event.action === 'open' || !event.action) {
    event.waitUntil(
      clients.openWindow('/notification.html')
    );
  }
});

console.log('[SW] FahriXZ Store Service Worker loaded');
