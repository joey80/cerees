import { createClient, type RedisClientType } from 'redis';

// Creating a Redis client
// https://github.com/orgs/vercel/discussions/1335
const globalForRedis = global as unknown as { redisClient: RedisClientType };
const redisClient = globalForRedis.redisClient ?? createClient({ url: process.env.REDIS_URL }).connect();

globalForRedis.redisClient = redisClient;

export { redisClient };
