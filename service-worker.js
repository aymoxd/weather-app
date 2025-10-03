const CACHE_NAME = "weather-app-cache-v1";
const urlsToCache = [
  "/",
  "/index.html",
  "/scripts/app.js",
  "/styles.css",
  "/icons/icon-192.png",
  "/icons/icon-512.png"
];

// Install SW and cache assets
self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(urlsToCache))
  );
});

// Activate SW
self.addEventListener("activate", event => {
  console.log("Service Worker activated");
});

// Fetch requests
self.addEventListener("fetch", event => {
  event.respondWith(
    caches.match(event.request).then(response => response || fetch(event.request))
  );
});
