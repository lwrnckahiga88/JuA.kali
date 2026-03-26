/**
 * PWA utilities for service worker registration, install prompts, and offline detection
 */

export interface InstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>;
}

export class PWAManager {
  private deferredPrompt: InstallPromptEvent | null = null;
  private isOnline = navigator.onLine;
  private listeners: {
    onInstallPrompt?: (event: InstallPromptEvent) => void;
    onOnlineStatusChange?: (isOnline: boolean) => void;
  } = {};

  async init() {
    console.log('[PWA] Initializing PWA Manager');

    // Register service worker
    await this.registerServiceWorker();

    // Setup install prompt listener
    this.setupInstallPrompt();

    // Setup online/offline listeners
    this.setupOnlineStatusListener();

    // Check for updates
    this.checkForUpdates();
  }

  private async registerServiceWorker() {
    if ('serviceWorker' in navigator) {
      try {
        const registration = await navigator.serviceWorker.register('/sw.js', {
          scope: '/',
          updateViaCache: 'none'
        });

        console.log('[PWA] Service Worker registered:', registration);

        // Check for updates periodically
        setInterval(() => {
          registration.update();
        }, 60000); // Check every minute

        // Listen for updates
        registration.addEventListener('updatefound', () => {
          const newWorker = registration.installing;
          if (newWorker) {
            newWorker.addEventListener('statechange', () => {
              if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
                console.log('[PWA] New service worker available');
                this.notifyUpdate();
              }
            });
          }
        });

        return registration;
      } catch (error) {
        console.error('[PWA] Service Worker registration failed:', error);
      }
    }
  }

  private setupInstallPrompt() {
    window.addEventListener('beforeinstallprompt', (e: Event) => {
      e.preventDefault();
      this.deferredPrompt = e as InstallPromptEvent;
      console.log('[PWA] Install prompt available');

      if (this.listeners.onInstallPrompt) {
        this.listeners.onInstallPrompt(this.deferredPrompt);
      }
    });

    window.addEventListener('appinstalled', () => {
      console.log('[PWA] App installed');
      this.deferredPrompt = null;
    });
  }

  private setupOnlineStatusListener() {
    window.addEventListener('online', () => {
      this.isOnline = true;
      document.body.classList.remove('offline');
      console.log('[PWA] Back online');

      if (this.listeners.onOnlineStatusChange) {
        this.listeners.onOnlineStatusChange(true);
      }

      // Trigger background sync
      this.triggerBackgroundSync();
    });

    window.addEventListener('offline', () => {
      this.isOnline = false;
      document.body.classList.add('offline');
      console.log('[PWA] Went offline');

      if (this.listeners.onOnlineStatusChange) {
        this.listeners.onOnlineStatusChange(false);
      }
    });
  }

  private checkForUpdates() {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.ready.then((registration) => {
        setInterval(() => {
          registration.update();
        }, 60000); // Check every minute
      });
    }
  }

  private notifyUpdate() {
    if ('serviceWorker' in navigator && navigator.serviceWorker.controller) {
      const event = new Event('sw-update-available');
      window.dispatchEvent(event);
    }
  }

  private triggerBackgroundSync() {
    if ('serviceWorker' in navigator && 'SyncManager' in window) {
      navigator.serviceWorker.ready.then((registration) => {
        (registration as any).sync.register('sync-data').catch((error: any) => {
          console.error('[PWA] Background sync registration failed:', error);
        });
      });
    }
  }

  // Public methods
  async promptInstall() {
    if (!this.deferredPrompt) {
      console.log('[PWA] Install prompt not available');
      return false;
    }

    try {
      await this.deferredPrompt.prompt();
      const { outcome } = await this.deferredPrompt.userChoice;
      console.log('[PWA] User response to install prompt:', outcome);

      if (outcome === 'accepted') {
        this.deferredPrompt = null;
        return true;
      }
      return false;
    } catch (error) {
      console.error('[PWA] Install prompt error:', error);
      return false;
    }
  }

  canInstall() {
    return this.deferredPrompt !== null;
  }

  isInstalled() {
    return window.matchMedia('(display-mode: standalone)').matches ||
           (window.navigator as any).standalone === true;
  }

  getOnlineStatus() {
    return this.isOnline;
  }

  onInstallPrompt(callback: (event: InstallPromptEvent) => void) {
    this.listeners.onInstallPrompt = callback;
  }

  onOnlineStatusChange(callback: (isOnline: boolean) => void) {
    this.listeners.onOnlineStatusChange = callback;
  }

  async requestNotificationPermission() {
    if ('Notification' in window) {
      if (Notification.permission === 'granted') {
        return true;
      }

      if (Notification.permission !== 'denied') {
        const permission = await Notification.requestPermission();
        return permission === 'granted';
      }
    }
    return false;
  }

  async subscribeToPushNotifications() {
    if ('serviceWorker' in navigator && 'PushManager' in window) {
      try {
        const registration = await navigator.serviceWorker.ready;
        const subscription = await (registration as any).pushManager.getSubscription();

        if (!subscription) {
          const newSubscription = await (registration as any).pushManager.subscribe({
            userVisibleOnly: true,
            applicationServerKey: this.urlBase64ToUint8Array(
              'BElmYgeJJYp_IsDcBwC6qum3mkpsqareStGQUfW-T7s'
            )
          });
          console.log('[PWA] Push subscription created');
          return newSubscription;
        }

        return subscription;
      } catch (error) {
        console.error('[PWA] Push subscription error:', error);
      }
    }
  }

  private urlBase64ToUint8Array(base64String: string) {
    const padding = '='.repeat((4 - (base64String.length % 4)) % 4);
    const base64 = (base64String + padding).replace(/\-/g, '+').replace(/_/g, '/');

    const rawData = window.atob(base64);
    const outputArray = new Uint8Array(rawData.length);

    for (let i = 0; i < rawData.length; ++i) {
      outputArray[i] = rawData.charCodeAt(i);
    }

    return outputArray;
  }

  async cacheAssets(urls: string[]) {
    if ('caches' in window) {
      try {
        const cache = await caches.open('juakali-assets-v1');
        await cache.addAll(urls);
        console.log('[PWA] Assets cached');
      } catch (error) {
        console.error('[PWA] Asset caching error:', error);
      }
    }
  }

  async clearCache(cacheName?: string) {
    if ('caches' in window) {
      try {
        if (cacheName) {
          await caches.delete(cacheName);
        } else {
          const cacheNames = await caches.keys();
          await Promise.all(cacheNames.map((name) => caches.delete(name)));
        }
        console.log('[PWA] Cache cleared');
      } catch (error) {
        console.error('[PWA] Cache clearing error:', error);
      }
    }
  }
}

// Create singleton instance
export const pwaManager = new PWAManager();
