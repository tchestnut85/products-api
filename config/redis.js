require('dotenv').config();
const redis = require('redis');

const PORT = process.env.REDPORT;
let client;

async function connectRedis() {
	client = redis.createClient({ port: PORT });
	await client.connect();
}
connectRedis();

client.on('connect', () =>
	console.log(`\nConnected to Redis on port: ${PORT}`)
);

module.exports = client;
