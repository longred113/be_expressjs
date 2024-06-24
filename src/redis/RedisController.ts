// This file contains the RedisController class which is responsible for connecting to Redis, and performing basic operations on Redis.

// Import necessary modules
import * as redis from 'redis'; // Import the Redis module
import * as util from 'util'; // Import the util module for promisifying functions

// Define the RedisCache interface
interface RedisCache {
    hasKey: string; // The key of the hash in Redis
    key: string; // The key of the field in the hash
    values?: any; // The value of the field in the hash
}

// Define the RedisModel interface
interface RedisModel {
    keyModel: string; // The key of the model in Redis
    keyValue: string; // The value of the model in Redis
    value?: Record<string, any>; // The value to be stored in Redis
    timer?: number; // The timer for the Redis cache
}

// Define the RedisController class
class RedisController {
    private REDIS_URL: string = process.env.REDIS_URI as string; // The URL of the Redis server
    private TIMER: number = 3600; // The timer for the Redis cache (in seconds)
    private client: redis.RedisClientType; // The Redis client

    // Constructor for the RedisController class
    constructor() {
        // Create a Redis client using the Redis URL from the environment variables
        this.client = redis.createClient({ url: this.REDIS_URL });
        // Promisify the get method of the Redis client
        util.promisify(this.client.get).bind(this.client);
        // Connect to the Redis server
        this.connectRedist();
    }

    // Connect to the Redis server
    async connectRedist() {
        await this.client.connect();
    }

    // Disconnect from the Redis server
    async disconnectRedist() {
        await this.client.quit();
    }

    // Get a value from Redis using a key model and key value
    async getRedis({ keyModel, keyValue }: RedisModel) {
        const keys = `${keyModel}:${keyValue}`; // Construct the Redis key
        const result = await this.client.get(keys); // Get the value from Redis
        return JSON.parse(result as any); // Parse the result and return it
    }

    // Set a value in Redis using a key model, key value, and value
    async setRedis({ keyModel, keyValue, value }: RedisModel) {
        const keys = `${keyModel}:${keyValue}`; // Construct the Redis key
        return await this.client.set(keys, JSON.stringify(value)); // Set the value in Redis
    }

    // Get a value from a hash in Redis using a has key and key
    async getHasRedis({ hasKey, key }: RedisCache) {
        const result = await this.client.hGet(hasKey, key); // Get the value from the hash in Redis
        return JSON.parse(result as any); // Parse the result and return it
    }

    // Set a value in a hash in Redis using a has key, key, and values
    async setHasRedis({ hasKey, key, values }: RedisCache) {
        return await this.client.hSet(hasKey, key, JSON.stringify(values)); // Set the value in the hash in Redis
    }

    // Clear a hash in Redis using a key
    async clearHashRedis(key: string) {
        return await this.client.del(JSON.stringify(key)); // Delete the hash in Redis
    }
}

// Create a new instance of the RedisController and export it
export const redisController = new RedisController();

