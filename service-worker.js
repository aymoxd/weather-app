self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open('weather-app-cache-v2').then((cache) => {
      return cache.addAll([
        './',
        './index.html',
        './scripts/app.js', 
        './icons/icon-512.png'
      ]);
    })
  );
});

self.addEventListener('fetch', (e) => {
  e.respondWith(
    caches.match(e.request).then((response) => response || fetch(e.request))
  );
});
