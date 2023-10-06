import { Injectable } from '@nestjs/common';
import crypto from 'crypto';
import { AbstractSMSService } from './adapter/abstractSMS.service';
import { AbstractCacheService } from './adapter/abstractCache.service';
import { Role } from '../interface/model/role.model';
import * as jwt from 'jsonwebtoken';
import { jwtConfig } from 'src/config/jwt.config';
import { RefreshTokenPayload } from '../interface/model/refreshTokenPayload.model';
import { AccessTokenPayload } from '../interface/model/accessTokenPayload.model';
import { CustomBadRequestException } from 'src/common/exception/badRequest.exception';
import { ERROR_CODE } from 'src/common/constant/errorCode.constants';
import { CustomUnauthorizedException } from 'src/common/exception/unauthorization.exception';

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

  public verify(accessToken: string) {
    const decodedAccessToken = jwt.decode(accessToken) as AccessTokenPayload;

    if ((decodedAccessToken.exp as number) < Date.now() / 1000) {
      throw new CustomUnauthorizedException(
        ERROR_CODE.AUTH.EXPIRED_ACCESS_TOKEN,
        '만료된 엑세스 토큰입니다.',
      );
    }

    try {
      jwt.verify(accessToken, jwtConfig.accessTokenSecret);

      const { id, role } = decodedAccessToken;

      return { userId: id, role };
    } catch (err) {
      console.log(err);
      throw new CustomUnauthorizedException(
        ERROR_CODE.AUTH.INVALID_ACCESS_TOKEN,
        '유효하지 않은 엑세스 토큰입니다.',
      );
    }
  }

  public async refresh(refreshToken: string) {
    const decodedRefreshToken = jwt.decode(refreshToken) as RefreshTokenPayload;

    const registeredRefreshToken = await this.cacheService.getRefreshToken(
      refreshToken,
    );

    if (registeredRefreshToken) {
      throw new CustomUnauthorizedException(
        ERROR_CODE.AUTH.EXPIRED_REFRESH_TOKEN,
        '만료됐거나 존재하지 않는 리프레쉬 토큰입니다.',
      );
    }

    try {
      jwt.verify(refreshToken, jwtConfig.refreshTokenSecret);

      const { id } = decodedRefreshToken;

      return await this.createAccessToken(id, 'user');
    } catch (err) {
      console.log(err);
      throw new CustomUnauthorizedException(
        ERROR_CODE.AUTH.EXPIRED_REFRESH_TOKEN,
        '유효하지 않은 리프레쉬 토큰입니다.',
      );
    }
  }

  private async checkAuthMobileNumber(
    mobileNumber: string,
    authNumber: string,
  ) {
    const registeredAuthNumber = await this.cacheService.getAuthMobileNumber(
      mobileNumber,
    );

    if (!registeredAuthNumber) {
      throw new CustomUnauthorizedException(
        ERROR_CODE.AUTH.INVALID_AUTH_NUMBER,
        '인증번호가 없거나 만료되었습니다.',
      );
    }

    if (registeredAuthNumber !== authNumber) {
      throw new CustomBadRequestException(
        ERROR_CODE.AUTH.INVALID_AUTH_NUMBER,
        '인증번호가 일치하지 않습니다.',
      );
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
