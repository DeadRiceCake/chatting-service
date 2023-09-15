import { Module } from '@nestjs/common';
import { AuthService } from './application/auth.service';
import { AbstractSMSService } from './application/adapter/abstractSMS.service';
import { SMSService } from './infra/adapter/SMS.service';
import { AbstractCacheService } from './application/adapter/abstractCache.service';
import { RedisService } from './infra/adapter/cache.service';
import { SMSModule } from 'src/SMS/SMS.module';
import { RedisModule } from 'src/redis/redis.module';

const adapters = [
  { provide: AbstractSMSService, useClass: SMSService },
  { provide: AbstractCacheService, useClass: RedisService },
];

@Module({
  imports: [SMSModule, RedisModule],
  providers: [AuthService, ...adapters],
  exports: [AuthService],
})
export class AuthModule {}
