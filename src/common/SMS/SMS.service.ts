import { Injectable, InternalServerErrorException } from '@nestjs/common';
import axios from 'axios';
import crypto from 'crypto';
import { MessageBody, SendSMSBody } from './SMS.type';
import { ConfigService } from '@nestjs/config';
import { NCPConfig } from 'src/config/ncp.config';

@Injectable()
export class SMSService {
  constructor(private configService: ConfigService<NCPConfig>) {}

  private readonly baseUrl = this.configService.get<string>('sms.baseUrl', {
    infer: true,
  }) as string;
  private readonly serviceId = this.configService.get<string>('sms.serviceId', {
    infer: true,
  }) as string;
  private readonly accessKey = this.configService.get<string>('accessKey', {
    infer: true,
  }) as string;
  private readonly secretKey = this.configService.get<string>('secretKey', {
    infer: true,
  }) as string;
  private readonly fromMobileNumber = this.configService.get<string>(
    'sms.fromMobileNumber',
    {
      infer: true,
    },
  ) as string;

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
