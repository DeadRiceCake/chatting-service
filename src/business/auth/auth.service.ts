import { Inject, Injectable } from '@nestjs/common';
import { ResponseBody } from 'src/common/class/responseBody.class';
import { JwtService } from '@nestjs/jwt';
import { UserRepository } from './user.repository';
import { SendAuthSMSRequest } from './dto/sendAuthSMSRequest.dto';
import { SMSService } from 'src/common/SMS/SMS.service';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';
import crypto from 'crypto';

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

    const authNumber = crypto.randomInt(100000, 999999);
    const authNumberTTL = 60000;

    await this.RedisManager.set(
      `mobile-number:${mobileNumber}`,
      authNumber,
      authNumberTTL,
    );

    await this.smsService.sendSMS(
      `[노드맨의 서비스] 인증번호 [${authNumber}]를 입력해주세요.`,
      [{ to: mobileNumber }],
    );

    return new ResponseBody('인증번호 전송 성공');
  }
}
