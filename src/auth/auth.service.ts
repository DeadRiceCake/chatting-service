import { Inject, Injectable } from '@nestjs/common';
import { SMSService } from 'src/SMS/SMS.service';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';
import crypto from 'crypto';
import { BadRequestException } from '@nestjs/common';
import {
  getAuthMobileNumberKey,
  getAuthMobileNumberVerifiedKey,
} from 'src/utils/redis/getKey';

@Injectable()
export class AuthService {
  constructor(
    private smsService: SMSService,
    @Inject(CACHE_MANAGER) private RedisManager: Cache,
  ) {}

  public async sendAuthSMS(mobileNumber: string) {
    const authMobileNumberKey = getAuthMobileNumberKey(mobileNumber);
    const authNumber = crypto.randomInt(100000, 999999).toString();
    const authNumberTTL = 5 * 60 * 1000;

    await this.RedisManager.set(authMobileNumberKey, authNumber, authNumberTTL);

    return await this.smsService.sendAuthSMS(mobileNumber, authNumber);
  }

  public async verifyAuthSMS(mobileNumber: string, authNumber: string) {
    const authMobileNumberKey = getAuthMobileNumberKey(mobileNumber);

    const registeredAuthNumber = await this.RedisManager.get(
      authMobileNumberKey,
    );

    if (!registeredAuthNumber) {
      throw new BadRequestException('인증번호가 없거나 만료되었습니다.');
    }

    if (registeredAuthNumber !== authNumber) {
      throw new BadRequestException('인증번호가 일치하지 않습니다.');
    }

    await this.RedisManager.del(authMobileNumberKey);

    const authNumberVerifiedKey = getAuthMobileNumberVerifiedKey(mobileNumber);
    const authNumberVerifiedTTL = 30 * 60 * 1000;

    await this.RedisManager.set(
      authNumberVerifiedKey,
      true,
      authNumberVerifiedTTL,
    );
  }
}
