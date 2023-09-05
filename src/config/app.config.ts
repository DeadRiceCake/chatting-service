import { ConfigModuleOptions } from '@nestjs/config';
import databaseConfig from './database.config';
import ncpConfig from './ncp.config';
import redisConfig from './redis.config';

export default (): ConfigModuleOptions => ({
  envFilePath: `${process.env.NODE_ENV}.env`,
  load: [databaseConfig, ncpConfig, redisConfig],
  isGlobal: true,
});
