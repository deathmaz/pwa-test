import {
  precacheAndRoute,
} from 'workbox-precaching';
import {
  offlineFallback,
} from 'workbox-recipes';
import {
  setDefaultHandler, registerRoute,
} from 'workbox-routing';
import {
  NetworkOnly, CacheFirst,
} from 'workbox-strategies';
import {
  ExpirationPlugin,
} from 'workbox-expiration';
import {
  CacheableResponsePlugin,
} from 'workbox-cacheable-response';

/* registerRoute(({
  request,
}) => request.destination === 'script', new NetworkFirst()); */

const MANIFEST = self.__WB_MANIFEST;
precacheAndRoute(MANIFEST);

registerRoute(
  /^https:\/\/picsum.photos\/id*/,
  new CacheFirst({
    cacheName: 'remote-images',
    matchOptions: {
      ignoreVary: true,
    },
    plugins: [
      new ExpirationPlugin({
        maxEntries: 500,
        maxAgeSeconds: 2629800,
        purgeOnQuotaError: true,
      }),
      new CacheableResponsePlugin({
        statuses: [
          0,
          200,
        ],
      }),
    ],
  }),
);

setDefaultHandler(new NetworkOnly());

offlineFallback();

self.addEventListener('push', event => {
  const options = {
    body: 'This notification was generated from a push!',
    vibrate: [
      100,
      50,
      100,
    ],
    data: {
      dateOfArrival: Date.now(),
      primaryKey: 1,
    },
    actions: [
      {
        action: 'explore',
        title: 'Go to the site',
      },
      {
        action: 'close',
        title: 'Close the notification',
      },
    ],
  };

  event.waitUntil(self.registration.showNotification('Push Notification', options));
});

self.addEventListener('message', event => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }

  if (event.data.type === 'GET_MANIFEST') {
    event.ports[0].postMessage(MANIFEST);
  }
});
