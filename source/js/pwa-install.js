/**
 * @file
 * This file handles pwa installation
 */
window.addEventListener("load", () => init());

let installPrompt = null;

const installText = document.getElementById("install-text");
const installButton = document.getElementById("install-button");

/**
 * Initializes pwa functionality
 */
function init() {
  initializeServiceWorker();

  window.addEventListener("beforeinstallprompt", (event) => {
    event.preventDefault();
    installPrompt = event;
    installText.removeAttribute("hidden");
    installButton.removeAttribute("hidden");
  });

  installButton.addEventListener("click", async () => {
    if (!installPrompt) {
      return;
    }
    await installPrompt.prompt();
    disableInAppInstallPrompt();
  });

  window.addEventListener("appinstalled", () => {
    disableInAppInstallPrompt();
  });
}

/**
 * Hides the install prompt after successful install
 */
function disableInAppInstallPrompt() {
  installPrompt = null;
  installButton.setAttribute("hidden", "");
  installText.setAttribute("hidden", "");
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
