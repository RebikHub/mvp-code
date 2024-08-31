import { clientsClaim, skipWaiting } from 'workbox-core';
import { cleanupOutdatedCaches, precacheAndRoute } from 'workbox-precaching';

import { PeriodicSyncTag } from './enum';
import { showNotification } from './notification';

declare let self: ServiceWorkerGlobalScope;

interface PeriodicBackgroundSyncEvent extends ExtendableEvent {
  tag: string;
}

cleanupOutdatedCaches();

precacheAndRoute(self.__WB_MANIFEST || []);

skipWaiting();
clientsClaim();

// @ts-expect-error periodicsync is not included in the default SW interface.
self.addEventListener(
  'periodicsync',
  async (event: PeriodicBackgroundSyncEvent) => {
    if (event.tag === PeriodicSyncTag.openOrder) {
      event.waitUntil(showNotification());
    }
  },
);

self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  event.waitUntil(self.clients.openWindow('/'));
});

// подписка на событие push api

// self.addEventListener('push', () => {
//   self.registration.showNotification('simple push');
// });

// получение сообщений с клиента

// self.addEventListener('message', (event) => {
//   if (event.data && event.data.timestamp) {
//     const hours = Number((event.data.timestamp / (60 * 60 * 1000)).toFixed());
//     showNotification(hours);
//   }
// });
