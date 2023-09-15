import { Injectable } from '@nestjs/common';
import crypto from 'crypto';
import { BadRequestException } from '@nestjs/common';
import { AbstractSMSService } from './adapter/abstractSMS.service';
import { AbstractCacheService } from './adapter/abstractCache.service';

@Injectable()
export class AuthService {
  constructor(
    private smsService: AbstractSMSService,
    private cacheService: AbstractCacheService,
  ) {}

  public async sendAuthSMS(mobileNumber: string) {
    const authNumber = crypto.randomInt(100000, 999999).toString();
    const authNumberTTL = 5 * 60 * 1000;

    await this.cacheService.setAuthMobileNumber(
      mobileNumber,
      authNumber,
      authNumberTTL,
    );

    return await this.smsService.sendAuthSMS(mobileNumber, authNumber);
  }

  public async verifyAuthSMS(mobileNumber: string, authNumber: string) {
    const registeredAuthNumber = await this.cacheService.getAuthMobileNumber(
      mobileNumber,
    );

    if (!registeredAuthNumber) {
      throw new BadRequestException('인증번호가 없거나 만료되었습니다.');
    }

    if (registeredAuthNumber !== authNumber) {
      throw new BadRequestException('인증번호가 일치하지 않습니다.');
    }

    await this.cacheService.deleteAuthMobileNumber(mobileNumber);

    const authNumberVerifiedTTL = 30 * 60 * 1000;

    await this.cacheService.setAuthMobileNumberVerified(
      mobileNumber,
      authNumberVerifiedTTL,
    );
  }
}
