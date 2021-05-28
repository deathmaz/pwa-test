import {
  precacheAndRoute,
} from 'workbox-precaching';
import {
  offlineFallback,
} from 'workbox-recipes';
import {
  setDefaultHandler,
} from 'workbox-routing';
import {
  NetworkOnly,
} from 'workbox-strategies';

/* self.addEventListener('install', event => {
  self.skipWaiting();
}); */

/* registerRoute(({
  request,
}) => request.destination === 'script', new NetworkFirst()); */

/* registerRoute(
  ({
    request,
  }) => [
    'style',
    'script',
    'worker',
  ].includes(request.destination),
  new StaleWhileRevalidate({
    cacheName: 'asset-cache',
    plugins: [
      new CacheableResponsePlugin({
        statuses: [
          0,
          200,
        ],
      }),
    ],
  }),
); */

precacheAndRoute(self.__WB_MANIFEST);

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
});
