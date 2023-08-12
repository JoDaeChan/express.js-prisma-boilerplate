const redis = require("redis");

const redisClient = redis.createClient({
	port: process.env.REDIS_HOST,
});
// 6379

module.exports = redisClient;
