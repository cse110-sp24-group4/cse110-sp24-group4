window.addEventListener("load", () => init());

const installSection = document.getElementById('install-section');
const installButton = document.getElementById('install-button');
function init() {
  initializeServiceWorker();
  document.addEventListener('beforeinstallprompt', (event) => {
    event.preventDefault();
    installPrompt = event;
    installSection.removeAttribute("hidden");
  });
}

/**
 * Initializes service worker
 */
async function initializeServiceWorker() {
  if ("serviceWorker" in navigator) {
    try {
      const register = await navigator.serviceWorker.register("./sw.js");
      if (register.active) {
        // eslint-disable-next-line
        console.log("Service worker successfully registered");
      }
    } catch (err) {
      // eslint-disable-next-line
      console.error("Service worker failed to register", err);
    }
  }
}