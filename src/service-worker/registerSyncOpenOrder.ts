import { PeriodicSyncTag } from './enum';

export const registerSyncOpenOrder = async (timestamp: number) => {
  navigator.serviceWorker.ready.then(async (registration) => {
    if ('periodicSync' in registration && timestamp >= 24 * 60 * 60 * 1000) {
      const status = await navigator.permissions.query({
        // @ts-expect-error periodicsync is not included in the default SW interface.
        name: 'background-sync',
      });

      if (status.state === 'granted') {
        if (registration.active) {
          registration.active.postMessage({
            timestamp,
          });
        }

        await registration.periodicSync.register(PeriodicSyncTag.openOrder, {
          minInterval: timestamp, // 24 hours 24 * 60 * 60 * 1000
        });
      }
    }
  });
};
