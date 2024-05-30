const CACHE_NAME = "devdog";

// Installs the service worker. Feed it some initial URLs to cache
self.addEventListener("install", function (event) {
  event.waitUntil(
    caches.open(CACHE_NAME).then(function (cache) {
      return cache.addAll([
        "./",
        "./index.html",
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
      ]);
    }),
  );
});

// Activates the service worker
self.addEventListener("activate", function (event) {
  event.waitUntil(self.clients.claim());
});
