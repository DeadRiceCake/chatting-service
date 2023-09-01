export interface NCPConfig {
  accessKey: string;
  secretKey: string;
  sms: {
    serviceId: string;
    fromMobileNumber: string;
    baseUrl: string;
  };
}

export default (): NCPConfig => ({
  accessKey: String(process.env.NCP_ACCESS_KEY),
  secretKey: String(process.env.NCP_SECRET_KEY),
  sms: {
    serviceId: String(process.env.NCP_SMS_SERVICE_ID),
    fromMobileNumber: String(process.env.NCP_SMS_FROM_MOBILE_NUMBER),
    baseUrl: 'https://sens.apigw.ntruss.com',
  },
});
