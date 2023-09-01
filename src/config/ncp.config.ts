export default () => ({
  ACCESS_KEY: String(process.env.NCP_ACCESS_KEY),
  SECRET_KEY: String(process.env.NCP_SECRET_KEY),

  SMS_SERVICE_ID: String(process.env.NCP_SMS_SERVICE_ID),
  SMS_FROM_MOBILE_NUMBER: String(process.env.NCP_SMS_FROM_MOBILE_NUMBER),
  SMS_BASE_URL: 'https://sens.apigw.ntruss.com',
});
