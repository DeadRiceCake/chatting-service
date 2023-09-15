export abstract class AbstractCacheService {
  abstract getAuthMobileNumber(
    mobileNumber: string,
  ): Promise<string | undefined>;

  abstract setAuthMobileNumber(
    mobileNumber: string,
    authNumber: string,
    ttl: number,
  ): Promise<void>;

  abstract deleteAuthMobileNumber(mobileNumber: string): Promise<void>;

  abstract getAuthMobileNumberVerified(
    mobileNumber: string,
  ): Promise<boolean | undefined>;

  abstract setAuthMobileNumberVerified(
    mobileNumber: string,
    ttl: number,
  ): Promise<void>;
}
