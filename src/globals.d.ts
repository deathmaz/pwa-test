import {
  Workbox,
} from 'workbox-window';

export {};

declare global {
  interface Window {
    mazServiceWorkerRegistration?: ServiceWorkerRegistration;
    mazWorkbox?: Workbox;
  }
}
