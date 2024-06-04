window.addEventListener("load", () => init());

function init() {
    initializeServiceWorker();
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

// Initialize deferredPrompt for use later to show browser install prompt.
let deferredPrompt;

window.addEventListener('beforeinstallprompt', (e) => {
  // Prevent the mini-infobar from appearing on mobile
  e.preventDefault();
  // Stash the event so it can be triggered later.
  deferredPrompt = e;
  // Optionally, send analytics event that PWA install promo was shown.
  console.log(`'beforeinstallprompt' event was fired.`);
});

let buttonInstall = document.getElementById('pwa-install-button');
buttonInstall.addEventListener('click', async () => {
    // Show the install prompt
    deferredPrompt.prompt();
    // Wait for the user to respond to the prompt
    const { outcome } = await deferredPrompt.userChoice;
    // Optionally, send analytics event with outcome of user choice
    console.log(`User response to the install prompt: ${outcome}`);
    // We've used the prompt and can't use it again, throw it away
    deferredPrompt = null;
  });