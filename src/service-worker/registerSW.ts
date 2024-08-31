interface PeriodicSyncManager {
  register(tag: string, options?: { minInterval: number }): Promise<void>;
}

declare global {
  interface ServiceWorkerRegistration {
    readonly periodicSync: PeriodicSyncManager;
  }
}

export function registerServiceWorker() {
  window.addEventListener('load', () => {
    if ('serviceWorker' in navigator) {
      void navigator.serviceWorker.register(
        import.meta.env.MODE === 'production' ? '/sw.js' : '/dev-sw.js?dev-sw',
        { type: import.meta.env.MODE === 'production' ? 'classic' : 'module' },
      );
    }
  });
}
