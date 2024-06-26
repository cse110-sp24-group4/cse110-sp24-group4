const CACHE_NAME = "devdog";
/** Cache expires after 12 hours */
const EXPIRATION_TIME = 12 * 60 * 60 * 1000;

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
        "./assets/images/favicon.ico",
        "./assets/images/green-folder.png",
        "./assets/images/green-newfolder.png",
        "./assets/images/green-folder.png",
        "./assets/images/newfolder.png",
        "./assets/images/paw-print0.svg",
        "./assets/images/possible-logo.png",
        "./assets/images/demoimage-transparent.png",
        "./assets/images/final-logo.png",
        "./assets/images/demoimage.png",
        "./assets/images/project-page-demo.png",
        "./assets/images/to-do.png"
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
        if (cachedResponse) {
          const cachedDate = new Date(cachedResponse.headers.get("date"));
          const curDate = new Date();
          if (curDate.getTime() - cachedDate.getTime() <= EXPIRATION_TIME) {
            return cachedResponse;
          }
        }
        return fetch(event.request).then((fetchedResponse) => {
          cache
            .put(event.request, fetchedResponse.clone())
            .catch(() => console.log("Unsupported request to cache"));
          return fetchedResponse;
        });
      });
    }),
  );
});
