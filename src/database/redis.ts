import { createClient } from 'redis';

const client = createClient({
    url: process.env.REDIS_URI
});
client.on('connect', () => {
    console.log('Redis connected');
})
client.on('error', (err) => { console.log(err) });

export default client;

