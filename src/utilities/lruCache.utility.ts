import LRUCache from 'lru-cache';
import { singleton } from 'tsyringe';
import { logger } from './logger.utility';

@singleton()
export class LruCacheUtility {
    private lruCache: LRUCache<any, any> | undefined;
    private lruCacheOptions = {
      max: 1000, // cache max size is 1000 entries
      maxAge: 1000 * 60 * 720, // cache item max lifetime is 12 hours
    };

    /**
     * get the LRU cache object or initialize a new one
     * @private
     */
    private getOrInitCache(): LRUCache<any, any> {
      if (!this.lruCache) {
        this.lruCache = new LRUCache(this.lruCacheOptions);
      }

      return this.lruCache;
    }

    /**
     * set a new key value item in the LRU cache
     * @param key string: the key of the new LRU cache item
     * @param value any: the value of the new LRU cache item
     * @returns boolean: true is successful, false if not
     */
    public set(key: string, value: any): boolean {
      logger.info(`Attempting to set value in cache for key ${key}`);
      const cache = this.getOrInitCache();
      return cache.set(key, value);
    }

    /**
     * Get an item from the cache by the items key
     * @param key string: the key of the LRU cache item sought
     * @returns any: the value of the item under the key provided
     */
    get(key: string): any {
      const cache = this.getOrInitCache();
      return cache.get(key);
    }
}
