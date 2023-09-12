export const getAuthMobileNumberKey = (mobileNumber: string) => {
  return `mobile-number:${mobileNumber}:auth-number`;
};

export const getAuthMobileNumberVerifiedKey = (mobileNumber: string) => {
  return `mobile-number:${mobileNumber}:is-verified`;
};
