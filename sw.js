const CACHE_NAME = 'rotated-clock-v1';
const urlsToCache = [
  '/rotated-clock/',
  '/rotated-clock/index.html',
  '/rotated-clock/manifest.json',
  '/rotated-clock/clock_icon_192.png',
  '/rotated-clock/clock_icon_512.png',
  'https://fonts.googleapis.com/css2?family=Nunito:wght@400;600;700&display=swap',
  'https://fonts.gstatic.com/s/nunito/v20/XRXV3I6Li01BKofIOuaBXso.woff2'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => cache.addAll(urlsToCache))
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        if (response) {
          return response;
        }
        return fetch(event.request);
      })
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});