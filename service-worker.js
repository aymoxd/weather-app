// اسم الكاش الحالي (زد الرقم عند أي تحديث)
const CACHE_NAME = 'weather-app-cache-v3';

// الملفات التي سيتم كاشها
const FILES_TO_CACHE = [
  './',
  './index.html',
  './scripts/app.js',
  './icons/icon-512.png'
];

// تثبيت Service Worker وتخزين الملفات في الكاش
self.addEventListener('install', (event) => {
  console.log('[SW] Installing Service Worker...');
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('[SW] Caching app shell');
      return cache.addAll(FILES_TO_CACHE);
    })
  );
  self.skipWaiting(); // لتفعيل SW الجديد فوراً
});

// تنشيط Service Worker وحذف الكاش القديم
self.addEventListener('activate', (event) => {
  console.log('[SW] Activating Service Worker...');
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then((cacheNames) =>
      Promise.all(
        cacheNames.map((cache) => {
          if (!cacheWhitelist.includes(cache)) {
            console.log('[SW] Deleting old cache:', cache);
            return caches.delete(cache);
          }
        })
      )
    )
  );
  self.clients.claim(); // يجعل SW الجديد يسيطر على كل الصفحات فورًا
});

// اعتراض جميع الطلبات
self.addEventListener('fetch', (event) => {
  const url = new URL(event.request.url);

  // استثناء طلبات OpenWeatherMap من الكاش
  if (url.origin === 'https://api.openweathermap.org') {
    event.respondWith(
      fetch(event.request).catch(() => 
        new Response(JSON.stringify({ error: 'Network error fetching weather data' }), {
          headers: { 'Content-Type': 'application/json' }
        })
      )
    );
  } else {
    // جلب الملفات من الكاش أولًا ثم الشبكة
    event.respondWith(
      caches.match(event.request).then((response) => {
        return response || fetch(event.request);
      })
    );
  }
});
