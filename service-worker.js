const CACHE_NAME = "smb-static-v2";
const APP_SHELL = [
  "/",
  "/index.html",
  "/style.css",
  "/script.js",
  "/elevenlabs-audio.js",
  "/manifest.json",
  "/images/sound-mind-body-cosmic-music-logo.svg"
];

self.addEventListener("install", (event) => {
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(APP_SHELL))
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((key) => key !== CACHE_NAME).map((key) => caches.delete(key)))
    ).then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", (event) => {
  const request = event.request;

  if (request.method !== "GET") {
    return;
  }

  const url = new URL(request.url);
  const isSameOrigin = url.origin === self.location.origin;

  if (!isSameOrigin || url.pathname.startsWith("/.netlify/functions/")) {
    return;
  }

  event.respondWith(
    fetch(request)
      .then((networkResponse) => {
        const isCacheableResponse = networkResponse && networkResponse.status === 200 && networkResponse.type === "basic";

        if (isCacheableResponse) {
          const responseClone = networkResponse.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(request, responseClone));
        }

        return networkResponse;
      })
      .catch(() => caches.match(request))
  );
});
