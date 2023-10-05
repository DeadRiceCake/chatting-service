import { Injectable } from '@nestjs/common';
import { AbstractCacheService } from 'src/auth/application/adapter/abstractCache.service';
import { RedisService as ExternalCacheService } from 'src/redis/redis.service';

@Injectable()
export class RedisService implements AbstractCacheService {
  constructor(private cacheService: ExternalCacheService) {}

  async getAuthMobileNumber(mobileNumber: string): Promise<string | undefined> {
    return await this.cacheService.getAuthMobileNumber(mobileNumber);
  }

  async setAuthMobileNumber(
    mobileNumber: string,
    authNumber: string,
    ttl: number,
  ): Promise<void> {
    return await this.cacheService.setAuthMobileNumber(
      mobileNumber,
      authNumber,
      ttl,
    );
  }

  async deleteAuthMobileNumber(mobileNumber: string): Promise<void> {
    return await this.cacheService.deleteAuthMobileNumber(mobileNumber);
  }

  async getRefreshToken(refreshToken: string): Promise<string | undefined> {
    return await this.cacheService.getRefreshToken(refreshToken);
  }

  async setRefreshToken(
    userId: string,
    refreshToken: string,
    ttl: number,
  ): Promise<void> {
    return await this.cacheService.setRefreshToken(userId, refreshToken, ttl);
  }
}
