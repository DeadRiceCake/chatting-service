export const ERROR_CODE = {
  DB: {
    DUPLICATE_ENTRY: 'ER_DUP_ENTRY',
  },
  AUTH: {
    INVALID_AUTH_NUMBER: 'INVALID_AUTH_NUMBER',
    INVALID_ACCESS_TOKEN: 'INVALID_ACCESS_TOKEN',
    INVALID_REFRESH_TOKEN: 'INVALID_REFRESH_TOKEN',
    NO_TOKEN: 'NO_TOKEN',
    EXPIRED_ACCESS_TOKEN: 'EXPIRED_ACCESS_TOKEN',
    EXPIRED_REFRESH_TOKEN: 'EXPIRED_REFRESH_TOKEN',
  },
  USER: {
    NOT_FOUND: 'USER_NOT_FOUND',
    DUPLICATE_MOBILE_NUMBER: 'DUPLICATE_MOBILE_NUMBER',
    INVALID_AUTH_NUMBER: 'INVALID_AUTH_NUMBER',
  },
  SMS: {
    SEND_SMS_FAILED: 'SEND_SMS_FAILED',
  },
};
