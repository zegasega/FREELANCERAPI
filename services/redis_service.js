// services/redis_service.js
const redis = require('redis');

let client;

async function initRedis() {
  client = redis.createClient({
    url: 'redis://localhost:6379'
  });

  client.on('error', (err) => {
    console.error('Redis connection error:', err);
  });

  client.on('connect', () => {
    console.log('Redis connected successfully');
  });

  await client.connect();
}

function getClient() {
  if (!client) {
    throw new Error("Redis not initialized. Call initRedis() first.");
  }
  return client;
}

module.exports = {
  initRedis,
  getClient
};
