import { createStorage, type StorageValue } from "unstorage";
import memoryDriver from "unstorage/drivers/memory";

export class Cache {
  private storage;

  constructor() {
    // Swap driver here to change backend — app code stays the same
    this.storage = createStorage({ driver: memoryDriver() });
  }

  async get<T = unknown>(key: string): Promise<T | null> {
    return (await this.storage.getItem<T>(key)) ?? null;
  }

  async set(key: string, value: StorageValue, ttl?: number): Promise<void> {
    await this.storage.setItem(key, value, ttl ? { ttl } : undefined);
  }

  async del(key: string): Promise<void> {
    await this.storage.removeItem(key);
  }

  async has(key: string): Promise<boolean> {
    return await this.storage.hasItem(key);
  }

  async clear(): Promise<void> {
    await this.storage.clear();
  }
}

export const cache = new Cache();
