window.addEventListener("load", init);

/**
 * Initialization function when contents load
 */
function init() {
  checkPWA();
}

/**
 * Checks whether the current instance is running as PWA
 */
function checkPWA() {
  handlePWATransfer(window.matchMedia("(display-mode:standalone)"));
  window
    .matchMedia("(display-mode:standalone)")
    .addEventListener("change", (event) => {
      handlePWATransfer(event);
    });
}

/**
 * Handles transferring to PWA
 * @param {MediaQueryListEvent} event Event that fired this function
 */
function handlePWATransfer(event) {
  if (event.matches) {
    window.location.replace("pages/project.html");
  }
}
