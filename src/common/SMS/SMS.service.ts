import { Injectable, InternalServerErrorException } from '@nestjs/common';
import axios from 'axios';
import crypto from 'crypto';
import { MessageBody, SendSMSBody } from './SMS.type';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class SMSService {
  constructor(private configService: ConfigService) {}

  private readonly baseUrl = this.configService.get<string>(
    'SMS_BASE_URL',
    'not set',
  );
  private readonly serviceId = this.configService.get<string>(
    'SMS_SERVICE_ID',
    'not set',
  );
  private readonly accessKey = this.configService.get<string>(
    'ACCESS_KEY',
    'not set',
  );
  private readonly secretKey = this.configService.get<string>(
    'SECRET_KEY',
    'not set',
  );
  private readonly fromMobileNumber = this.configService.get<string>(
    'SMS_FROM_MOBILE_NUMBER',
    '01012345678',
  );

  public async sendSMS(content: string, toMobileNumbers: MessageBody[]) {
    const uri = `/sms/v2/services/${this.serviceId}/messages`;
    const timestamp = new Date().getTime().toString();
    const signature = this.makeSignature('POST', uri, timestamp);

    const headers = {
      'Content-Type': 'application/json',
      'x-ncp-apigw-timestamp': timestamp,
      'x-ncp-iam-access-key': this.accessKey,
      'x-ncp-apigw-signature-v2': signature,
    };

    const requestBody: SendSMSBody = {
      type: 'SMS',
      from: this.fromMobileNumber,
      content,
      messages: toMobileNumbers,
    };

    try {
      const sendSMSResponse = await axios.post(
        `${this.baseUrl}${uri}`,
        requestBody,
        { headers },
      );

      return sendSMSResponse.data;
    } catch (error) {
      console.error(error);
      throw new InternalServerErrorException('SMS 전송 실패');
    }
  }

  private makeSignature(method: string, uri: string, timestamp: string) {
    const space = ' ';
    const newLine = '\n';

    const hmac = crypto.createHmac('sha256', this.secretKey);
    hmac.update(method);
    hmac.update(space);
    hmac.update(uri);
    hmac.update(newLine);
    hmac.update(timestamp);
    hmac.update(newLine);
    hmac.update(this.accessKey);

    const hash = hmac.digest('base64');

    return hash;
  }
}
