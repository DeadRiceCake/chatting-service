import { Inject, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserRepository } from './infra/db/repository/user.repository';
import { SendAuthSMSRequest } from './dto/sendAuthSMSRequest.dto';
import { SMSService } from 'src/common/SMS/SMS.service';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';
import crypto from 'crypto';
import { VerifyAuthNumberRequest } from './dto/verifyAuthNumberRequest.dto';
import { BadRequestException } from '@nestjs/common';
import { SignUpRequest } from './dto/signupRequest.dto';

@Injectable()
export class AuthService {
  constructor(
    private userRepository: UserRepository,
    private jwtService: JwtService,
    private smsService: SMSService,
    @Inject(CACHE_MANAGER) private RedisManager: Cache,
  ) {}

  public async sendAuthSMS(sendAuthSMSRequest: SendAuthSMSRequest) {
    const { mobileNumber } = sendAuthSMSRequest;
    const authMobileNumberKey = this.getAuthMobileNumberKey(mobileNumber);
    const authNumber = crypto.randomInt(100000, 999999).toString();
    const authNumberTTL = 5 * 60 * 1000;

    await this.RedisManager.set(authMobileNumberKey, authNumber, authNumberTTL);

    await this.smsService.sendSMS(
      `[노드맨의 서비스] 인증번호 [${authNumber}]를 입력해주세요.`,
      [{ to: mobileNumber }],
    );
  }

  public async verifyAuthSMS(verifyAuthNumberRequest: VerifyAuthNumberRequest) {
    const { mobileNumber, authNumber } = verifyAuthNumberRequest;
    const authMobileNumberKey = this.getAuthMobileNumberKey(mobileNumber);

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

    const authNumberVerifiedKey =
      this.getAuthMobileNumberVerifiedKey(mobileNumber);
    const authNumberVerifiedTTL = 30 * 60 * 1000;

    await this.RedisManager.set(
      authNumberVerifiedKey,
      true,
      authNumberVerifiedTTL,
    );
  }

  private getAuthMobileNumberKey(mobileNumber: string) {
    return `mobile-number:${mobileNumber}:auth-number`;
  }

  private getAuthMobileNumberVerifiedKey(mobileNumber: string) {
    return `mobile-number:${mobileNumber}:is-verified`;
  }

  public async signup(signUpRequest: SignUpRequest) {
    const { mobileNumber, nickname } = signUpRequest;

    const authNumberVerifiedKey =
      this.getAuthMobileNumberVerifiedKey(mobileNumber);
    const isVerified = await this.RedisManager.get(authNumberVerifiedKey);

    if (!isVerified) {
      throw new BadRequestException('핸드폰번호 인증이 완료되지 않았습니다.');
    } else {
      await this.RedisManager.del(authNumberVerifiedKey);
    }

    const user = await this.userRepository.save({
      id: crypto.randomUUID(),
      mobile_number: mobileNumber,
      nickname,
    });

    return { user };
  }
}
