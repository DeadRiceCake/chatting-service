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

  abstract getRefreshToken(refreshToken: string): Promise<string | undefined>;

  abstract setRefreshToken(
    userId: string,
    refreshToken: string,
    ttl: number,
  ): Promise<void>;
}
