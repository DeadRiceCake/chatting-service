import { Injectable, Inject } from '@nestjs/common';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';

@Injectable()
export class RedisService {
  constructor(@Inject(CACHE_MANAGER) private RedisManager: Cache) {}

  public async getAuthMobileNumber(mobileNumber: string) {
    const authMobileNumberKey = this.getAuthMobileNumberKey(mobileNumber);

    return await this.RedisManager.get<string>(authMobileNumberKey);
  }

  public async setAuthMobileNumber(
    mobileNumber: string,
    authNumber: string,
    ttl: number,
  ) {
    const authMobileNumberKey = this.getAuthMobileNumberKey(mobileNumber);

    await this.RedisManager.set(authMobileNumberKey, authNumber, ttl);
  }

  public async deleteAuthMobileNumber(mobileNumber: string) {
    const authMobileNumberKey = this.getAuthMobileNumberKey(mobileNumber);

    await this.RedisManager.del(authMobileNumberKey);
  }

  public async getAuthMobileNumberVerified(mobileNumber: string) {
    const authMobileNumberVerifiedKey =
      this.getAuthMobileNumberVerifiedKey(mobileNumber);

    return await this.RedisManager.get<boolean>(authMobileNumberVerifiedKey);
  }

  public async setAuthMobileNumberVerified(mobileNumber: string, ttl: number) {
    const authMobileNumberVerifiedKey =
      this.getAuthMobileNumberVerifiedKey(mobileNumber);

    await this.RedisManager.set(authMobileNumberVerifiedKey, true, ttl);
  }

  public async deleteAuthMobileNumberVerified(mobileNumber: string) {
    const authMobileNumberVerifiedKey =
      this.getAuthMobileNumberVerifiedKey(mobileNumber);

    await this.RedisManager.del(authMobileNumberVerifiedKey);
  }

  private getAuthMobileNumberKey(mobileNumber: string) {
    return `mobile-number:${mobileNumber}:auth-number`;
  }

  private getAuthMobileNumberVerifiedKey(mobileNumber: string) {
    return `mobile-number:${mobileNumber}:is-verified`;
  }
}
