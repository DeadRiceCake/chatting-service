import { Injectable } from '@nestjs/common';
import { AbstractCacheService } from 'src/users/application/adapter/abstractCache.service';
import { RedisService as ExternalCacheService } from 'src/redis/redis.service';

@Injectable()
export class RedisService implements AbstractCacheService {
  constructor(private cacheService: ExternalCacheService) {}

  getAuthMobileNumberVerified(
    mobileNumber: string,
  ): Promise<boolean | undefined> {
    return this.cacheService.getAuthMobileNumberVerified(mobileNumber);
  }

  deleteAuthMobileNumberVerified(mobileNumber: string): Promise<void> {
    return this.cacheService.deleteAuthMobileNumberVerified(mobileNumber);
  }
}
