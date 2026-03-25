/**
 * Local Storage and IndexedDB utilities for offline data persistence
 */

// LocalStorage wrapper with JSON serialization
export const LocalStorage = {
  set: (key: string, value: any) => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error('LocalStorage set error:', error);
    }
  },

  get: (key: string, defaultValue: any = null) => {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : defaultValue;
    } catch (error) {
      console.error('LocalStorage get error:', error);
      return defaultValue;
    }
  },

  remove: (key: string) => {
    try {
      localStorage.removeItem(key);
    } catch (error) {
      console.error('LocalStorage remove error:', error);
    }
  },

  clear: () => {
    try {
      localStorage.clear();
    } catch (error) {
      console.error('LocalStorage clear error:', error);
    }
  }
};

// IndexedDB wrapper for larger data storage
export class IndexedDBStorage {
  private dbName = 'juakali-db';
  private version = 1;
  private db: IDBDatabase | null = null;

  async init() {
    return new Promise<IDBDatabase>((resolve, reject) => {
      const request = indexedDB.open(this.dbName, this.version);

      request.onerror = () => reject(request.error);
      request.onsuccess = () => {
        this.db = request.result;
        resolve(this.db);
      };

      request.onupgradeneeded = (event) => {
        const db = (event.target as IDBOpenDBRequest).result;

        // Create object stores
        const stores = [
          'userProfiles',
          'medicalImages',
          'analysisResults',
          'pendingOperations',
          'usageStats',
          'paymentHistory',
          'cachedData'
        ];

        stores.forEach((store) => {
          if (!db.objectStoreNames.contains(store)) {
            const objectStore = db.createObjectStore(store, { keyPath: 'id', autoIncrement: true });
            objectStore.createIndex('timestamp', 'timestamp', { unique: false });
            objectStore.createIndex('userId', 'userId', { unique: false });
          }
        });
      };
    });
  }

  async set(storeName: string, data: any) {
    if (!this.db) await this.init();

    return new Promise<number>((resolve, reject) => {
      const transaction = this.db!.transaction([storeName], 'readwrite');
      const objectStore = transaction.objectStore(storeName);
      const request = objectStore.put({
        ...data,
        timestamp: Date.now()
      });

      request.onerror = () => reject(request.error);
      request.onsuccess = () => resolve(request.result as number);
    });
  }

  async get(storeName: string, key: number | string) {
    if (!this.db) await this.init();

    return new Promise<any>((resolve, reject) => {
      const transaction = this.db!.transaction([storeName], 'readonly');
      const objectStore = transaction.objectStore(storeName);
      const request = objectStore.get(key);

      request.onerror = () => reject(request.error);
      request.onsuccess = () => resolve(request.result);
    });
  }

  async getAll(storeName: string) {
    if (!this.db) await this.init();

    return new Promise<any[]>((resolve, reject) => {
      const transaction = this.db!.transaction([storeName], 'readonly');
      const objectStore = transaction.objectStore(storeName);
      const request = objectStore.getAll();

      request.onerror = () => reject(request.error);
      request.onsuccess = () => resolve(request.result);
    });
  }

  async query(storeName: string, indexName: string, value: any) {
    if (!this.db) await this.init();

    return new Promise<any[]>((resolve, reject) => {
      const transaction = this.db!.transaction([storeName], 'readonly');
      const objectStore = transaction.objectStore(storeName);
      const index = objectStore.index(indexName);
      const request = index.getAll(value);

      request.onerror = () => reject(request.error);
      request.onsuccess = () => resolve(request.result);
    });
  }

  async delete(storeName: string, key: number | string) {
    if (!this.db) await this.init();

    return new Promise<void>((resolve, reject) => {
      const transaction = this.db!.transaction([storeName], 'readwrite');
      const objectStore = transaction.objectStore(storeName);
      const request = objectStore.delete(key);

      request.onerror = () => reject(request.error);
      request.onsuccess = () => resolve();
    });
  }

  async clear(storeName: string) {
    if (!this.db) await this.init();

    return new Promise<void>((resolve, reject) => {
      const transaction = this.db!.transaction([storeName], 'readwrite');
      const objectStore = transaction.objectStore(storeName);
      const request = objectStore.clear();

      request.onerror = () => reject(request.error);
      request.onsuccess = () => resolve();
    });
  }
}

// Create singleton instance
export const db = new IndexedDBStorage();

// User Profile Storage
export const UserStorage = {
  save: async (profile: any) => {
    LocalStorage.set('userProfile', profile);
    await db.set('userProfiles', profile);
  },

  get: async () => {
    return LocalStorage.get('userProfile');
  },

  clear: async () => {
    LocalStorage.remove('userProfile');
    await db.clear('userProfiles');
  }
};

// Usage Statistics Storage
export const UsageStorage = {
  increment: async (type: string) => {
    const stats = LocalStorage.get('usageStats', {
      imageAnalysis: 0,
      textProcessing: 0,
      predictions: 0,
      lastUpdated: Date.now()
    });

    if (type in stats) {
      stats[type]++;
      stats.lastUpdated = Date.now();
      LocalStorage.set('usageStats', stats);
      await db.set('usageStats', stats);
    }

    return stats;
  },

  get: async () => {
    return LocalStorage.get('usageStats', {
      imageAnalysis: 0,
      textProcessing: 0,
      predictions: 0,
      lastUpdated: Date.now()
    });
  },

  reset: async () => {
    const stats = {
      imageAnalysis: 0,
      textProcessing: 0,
      predictions: 0,
      lastUpdated: Date.now()
    };
    LocalStorage.set('usageStats', stats);
    await db.clear('usageStats');
    return stats;
  }
};

// Payment History Storage
export const PaymentStorage = {
  add: async (payment: any) => {
    const payments = LocalStorage.get('paymentHistory', []);
    payments.push({
      ...payment,
      timestamp: Date.now()
    });
    LocalStorage.set('paymentHistory', payments);
    await db.set('paymentHistory', payment);
    return payments;
  },

  getAll: async () => {
    return LocalStorage.get('paymentHistory', []);
  },

  clear: async () => {
    LocalStorage.remove('paymentHistory');
    await db.clear('paymentHistory');
  }
};

// Credits Storage
export const CreditsStorage = {
  set: (credits: number) => {
    LocalStorage.set('credits', credits);
  },

  get: () => {
    return LocalStorage.get('credits', 100); // Default 100 free credits
  },

  deduct: (amount: number) => {
    const current = CreditsStorage.get();
    const updated = Math.max(0, current - amount);
    CreditsStorage.set(updated);
    return updated;
  },

  add: (amount: number) => {
    const current = CreditsStorage.get();
    const updated = current + amount;
    CreditsStorage.set(updated);
    return updated;
  }
};

// Pending Operations Storage (for offline sync)
export const PendingOpsStorage = {
  add: async (operation: any) => {
    const ops = LocalStorage.get('pendingOperations', []);
    ops.push({
      ...operation,
      id: Date.now(),
      timestamp: Date.now()
    });
    LocalStorage.set('pendingOperations', ops);
    await db.set('pendingOperations', operation);
    return ops;
  },

  getAll: async () => {
    return LocalStorage.get('pendingOperations', []);
  },

  remove: async (id: number) => {
    const ops = LocalStorage.get('pendingOperations', []);
    const updated = ops.filter((op: any) => op.id !== id);
    LocalStorage.set('pendingOperations', updated);
    await db.delete('pendingOperations', id);
    return updated;
  },

  clear: async () => {
    LocalStorage.remove('pendingOperations');
    await db.clear('pendingOperations');
  }
};
