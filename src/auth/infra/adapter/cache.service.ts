import { Injectable } from '@nestjs/common';
import { AbstractCacheService } from 'src/auth/application/adapter/abstractCache.service';
import { RedisService as ExternalCacheService } from 'src/redis/redis.service';

@Injectable()
export class RedisService implements AbstractCacheService {
  constructor(private cacheService: ExternalCacheService) {}

  async getAuthMobileNumber(mobileNumber: string): Promise<string | undefined> {
    return await this.cacheService.getAuthMobileNumber(mobileNumber);
  }

  setAuthMobileNumber(
    mobileNumber: string,
    authNumber: string,
    ttl: number,
  ): Promise<void> {
    return this.cacheService.setAuthMobileNumber(mobileNumber, authNumber, ttl);
  }

  deleteAuthMobileNumber(mobileNumber: string): Promise<void> {
    return this.cacheService.deleteAuthMobileNumber(mobileNumber);
  }

  getAuthMobileNumberVerified(
    mobileNumber: string,
  ): Promise<boolean | undefined> {
    return this.cacheService.getAuthMobileNumberVerified(mobileNumber);
  }

  setAuthMobileNumberVerified(
    mobileNumber: string,
    ttl: number,
  ): Promise<void> {
    return this.cacheService.setAuthMobileNumberVerified(mobileNumber, ttl);
  }
}
