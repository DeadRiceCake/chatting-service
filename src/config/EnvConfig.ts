import dotenv from 'dotenv';
import path from 'path';

const ENV = process.env.NODE_ENV || 'development';

dotenv.config({
  path: path.join(__dirname, `../../../${ENV}.env`),
});

export const APP_CONFIG = {
  API_PREFIX: process.env.API_PREFIX || '/api',
  PORT: Number(process.env.PORT) || 3000,
};

export const SWAGGER_CONFIG = {
  ROUTE: String(process.env.SWAGGER_ROUTE),
};

export const DB_CONFIG = {
  DB_HOST: String(process.env.MY_SQL_DB_HOST),
  DB_USER: String(process.env.MY_SQL_DB_USER),
  DB_PASSWORD: String(process.env.MY_SQL_DB_PASSWORD),
  DB_PORT: String(process.env.MY_SQL_DB_PORT),
  DB_DATABASE: String(process.env.MY_SQL_DB_DATABASE),
  DB_CONNECTION_LIMIT: Number(process.env.MY_SQL_DB_CONNECTION_LIMIT),
};
