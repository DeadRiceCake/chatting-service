import { redisStore } from 'cache-manager-redis-yet';

export default () => ({
  isGlobal: true,
  store: redisStore,
  socket: {
    host: '127.0.0.1',
    port: 6379,
  },
});
