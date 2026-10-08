// Minimal service worker — exists only so the Área eStrat+ qualifies as an
// installable PWA. It does not cache anything, so content is always fresh.
self.addEventListener('install', () => {
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(self.clients.claim());
});

self.addEventListener('fetch', (event) => {
  event.respondWith(fetch(event.request));
});
