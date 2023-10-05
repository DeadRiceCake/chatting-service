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

  public async getRefreshToken(userId: string) {
    const refreshTokenKey = this.getRefreshTokenKey(userId);

    return await this.RedisManager.get<string>(refreshTokenKey);
  }

  public async setRefreshToken(
    userId: string,
    refreshToken: string,
    ttl: number,
  ) {
    const refreshTokenKey = this.getRefreshTokenKey(userId);

    await this.RedisManager.set(refreshTokenKey, refreshToken, ttl);
  }

  private getAuthMobileNumberKey(mobileNumber: string) {
    return `mobile-number:${mobileNumber}:auth-number`;
  }

  private getRefreshTokenKey(userId: string) {
    return `user:${userId}:refresh-token`;
  }
}
