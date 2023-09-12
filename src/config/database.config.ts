import { MysqlConnectionOptions } from 'typeorm/driver/mysql/MysqlConnectionOptions';

export default (): MysqlConnectionOptions => ({
  type: 'mysql',
  host: String(process.env.DB_HOST),
  port: Number(process.env.DB_PORT),
  username: String(process.env.DB_USER),
  password: String(process.env.DB_PASSWORD),
  database: String(process.env.DB_DATABASE),
  entities: [__dirname + '/../**/*.entity{.ts,.js}'],
  synchronize: false,
  charset: 'utf8mb4',
});
