import dotenv from 'dotenv';
import path from 'path';

const ENV = process.env.NODE_ENV || 'development';

dotenv.config({
  path: path.join(__dirname, `../../${ENV}.env`),
});

export const APP_CONFIG = {
  PORT: Number(process.env.PORT) || 3000,
};

export const DB_CONFIG = {
  DB_HOST: String(process.env.DB_HOST),
  DB_USER: String(process.env.DB_USER),
  DB_PASSWORD: String(process.env.DB_PASSWORD),
  DB_PORT: Number(process.env.DB_PORT),
  DB_DATABASE: String(process.env.DB_DATABASE),
  DB_SYNCHRONIZE: ENV === 'production' ? false : true,
};

export const JWT_CONFIG = {
  JWT_SECRET: String(process.env.JWT_SECRET),
};
