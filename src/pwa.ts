import { registerSW } from "virtual:pwa-register";

const UPDATE_INTERVAL_MS = 60 * 60 * 1000;

registerSW({
  immediate: true,
  onRegisteredSW(_serviceWorkerUrl, registration) {
    if (!registration) return;

    const checkForUpdate = () => {
      if (navigator.onLine) {
        void registration.update();
      }
    };

    checkForUpdate();

    window.setInterval(checkForUpdate, UPDATE_INTERVAL_MS);
    window.addEventListener("online", checkForUpdate);
    document.addEventListener("visibilitychange", () => {
      if (document.visibilityState === "visible") {
        checkForUpdate();
      }
    });
  },
});
