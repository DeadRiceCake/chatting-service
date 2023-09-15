export abstract class AbstractCacheService {
  abstract getAuthMobileNumberVerified(
    mobileNumber: string,
  ): Promise<boolean | undefined>;

  abstract deleteAuthMobileNumberVerified(mobileNumber: string): Promise<void>;
}
