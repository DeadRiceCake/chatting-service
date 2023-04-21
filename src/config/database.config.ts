import { DB_CONFIG } from './env.config';
import { MysqlConnectionOptions } from 'typeorm/driver/mysql/MysqlConnectionOptions';

export const databaseConfig: MysqlConnectionOptions = {
  type: 'mysql',
  host: DB_CONFIG.DB_HOST,
  port: DB_CONFIG.DB_PORT,
  username: DB_CONFIG.DB_USER,
  password: DB_CONFIG.DB_PASSWORD,
  database: DB_CONFIG.DB_DATABASE,
  entities: [__dirname + '/../**/*.entity{.ts,.js}'],
  synchronize: DB_CONFIG.DB_SYNCHRONIZE,
  charset: 'utf8mb4',
};
