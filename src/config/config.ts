import dotenv from 'dotenv';
import path from 'path';

const ENV = process.env.NODE_ENV || 'development';

dotenv.config({
  path: path.join(__dirname, `../../../${ENV}.env`),
});

export const APP_CONFIG = {
  API_PREFIX: process.env.API_PREFIX || '/api',
};
