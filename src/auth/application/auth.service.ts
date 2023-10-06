import { Injectable } from '@nestjs/common';
import crypto from 'crypto';
import { BadRequestException } from '@nestjs/common';
import { AbstractSMSService } from './adapter/abstractSMS.service';
import { AbstractCacheService } from './adapter/abstractCache.service';
import { Role } from '../interface/model/role.model';
import * as jwt from 'jsonwebtoken';
import { jwtConfig } from 'src/config/jwt.config';
import { RefreshTokenPayload } from '../interface/model/refreshTokenPayload.model';
import { AccessTokenPayload } from '../interface/model/accessTokenPayload.model';

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

  public async signIn(
    userId: string,
    role: Role,
    mobileNumber: string,
    authNumber: string,
  ) {
    await this.checkAuthMobileNumber(mobileNumber, authNumber);

    const refreshToken = await this.createRefreshToken(userId);
    const accessToken = await this.createAccessToken(userId, role);

    await this.cacheService.setRefreshToken(
      userId,
      refreshToken,
      jwtConfig.refreshTokenExpiresIn,
    );

    return {
      refreshToken,
      accessToken,
    };
  }

  private async checkAuthMobileNumber(
    mobileNumber: string,
    authNumber: string,
  ) {
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
  }

  private async createRefreshToken(id: string) {
    const refreshTokenPayload: RefreshTokenPayload = {
      id,
    };

    const refreshToken = jwt.sign(
      refreshTokenPayload,
      jwtConfig.refreshTokenSecret,
    );

    return refreshToken;
  }

  private async createAccessToken(id: string, role: Role) {
    const accessTokenPayload: AccessTokenPayload = {
      id,
      role,
    };

    const accessToken = jwt.sign(
      accessTokenPayload,
      jwtConfig.accessTokenSecret,
      {
        expiresIn: jwtConfig.accessTokenExpiresIn,
      },
    );

    return accessToken;
  }
}
