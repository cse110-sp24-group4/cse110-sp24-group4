const CACHE_NAME = "devdog";

// Installs the service worker. Feed it some initial URLs to cache
self.addEventListener("install", function (event) {
  event.waitUntil(
    caches.open(CACHE_NAME).then(function (cache) {
      return cache.addAll([
        "./",
        "./index.html",
        "./js/pwa-install.js",
        "./js/project.js",
        "./js/notes.js",
        "./js/todo.js",
        "./css/main.css",
        "./css/index.css",
        "./css/project.css",
        "./css/notes.css",
        "./css/todo.css",
        "./pages/project.html",
        "./pages/notes.html",
        "./assets/favicon.ico",
        "./assets/green-folder.png",
        "./assets/green-newfolder.png",
        "./assets/green-folder.png",
        "./assets/new-folder.png",
        "./assets/paw-print0.svg",
        "./assets/possible-logo.png",
      ]);
    }),
  );
});

// Activates the service worker
self.addEventListener("activate", function (event) {
  event.waitUntil(self.clients.claim());
});

self.addEventListener("fetch", function (event) {
  event.respondWith(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.match(event.request).then((cachedResponse) => {
        return (
          cachedResponse ||
          fetch(event.request).then((fetchedResponse) => {
            cache
              .put(event.request, fetchedResponse.clone())
              .catch(() => console.log("Unsupported request to cache"));
            return fetchedResponse;
          })
        );
      });
    }),
  );
});
