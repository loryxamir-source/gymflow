// Build version: 1784324209090 — this comment changes every build, which is
// what makes browsers notice this file is different and check for an update.
var CACHE_NAME = 'gymflow-cache-1784324209090';

self.addEventListener('install', function () {
  self.skipWaiting();
});

self.addEventListener('activate', function (event) {
  event.waitUntil(
    caches.keys().then(function (keys) {
      return Promise.all(
        keys.filter(function (k) { return k !== CACHE_NAME; }).map(function (k) { return caches.delete(k); })
      );
    }).then(function () {
      return self.clients.claim();
    })
  );
});

self.addEventListener('fetch', function (event) {
  if (event.request.method !== 'GET') return;
  event.respondWith(
    fetch(event.request, { cache: 'no-store' })
      .then(function (res) {
        var copy = res.clone();
        caches.open(CACHE_NAME).then(function (c) { c.put(event.request, copy); });
        return res;
      })
      .catch(function () {
        return caches.match(event.request);
      })
  );
});
