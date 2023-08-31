import dotenv from 'dotenv';
import path from 'path';

const ENV = process.env.NODE_ENV || 'development';

dotenv.config({
  path: path.join(__dirname, `../../${ENV}.env`),
});

export const ncpConfig = {
  ACCESS_KEY: String(process.env.NCP_ACCESS_KEY),
  SECRET_KEY: String(process.env.NCP_SECRET_KEY),

  sms: {
    SERVICE_ID: String(process.env.NCP_SMS_SERVICE_ID),
    FROM_MOBILE_NUMBER: String(process.env.NCP_SMS_FROM_MOBILE_NUMBER),
    BASE_URL: 'https://sens.apigw.ntruss.com/sms/v2',
  },
};
