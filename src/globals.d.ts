export {};

declare global {
  interface Window {
    mazServiceWorkerRegistration: ServiceWorkerRegistration;
  }
}
