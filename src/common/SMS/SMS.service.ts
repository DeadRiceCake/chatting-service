import { Injectable } from '@nestjs/common';
import axios from 'axios';
import crypto from 'crypto';
import { ncpConfig } from 'src/config/ncp.config';

@Injectable()
export class SMSService {
  private readonly baseUrl = ncpConfig.sms.BASE_URL;
  private readonly serviceId = ncpConfig.sms.SERVICE_ID;
  private readonly fromMobileNumber = ncpConfig.sms.FROM_MOBILE_NUMBER;

  public async sendSMS(content: string, toMobileNumbers: { to: string }[]) {
    const uri = `/sms/v2/services/${this.serviceId}/messages`;
    const timestamp = new Date().getTime().toString();
    const signature = this.makeSignature('POST', uri, timestamp);
    const requestBody = {
      type: 'SMS',
      from: this.fromMobileNumber,
      content: '노드맨의 개인 프로젝트 회원가입 인증번호 [6974]',
      messages: toMobileNumbers,
    };

    const sendSMSResponse = await axios.post(
      `${this.baseUrl}${uri}`,
      requestBody,
      {
        headers: {
          'Content-Type': 'application/json',
          'x-ncp-apigw-timestamp': timestamp,
          'x-ncp-iam-access-key': 'DhFeZtuaVv6dLo8YpHne',
          'x-ncp-apigw-signature-v2': signature,
        },
      },
    );

    return sendSMSResponse.data;
  }

  private makeSignature(method: string, uri: string, timestamp: string) {
    const space = ' ';
    const newLine = '\n';
    const accessKey = ncpConfig.ACCESS_KEY;
    const secretKey = ncpConfig.SECRET_KEY;

    const hmac = crypto.createHmac('sha256', secretKey);
    hmac.update(method);
    hmac.update(space);
    hmac.update(uri);
    hmac.update(newLine);
    hmac.update(timestamp);
    hmac.update(newLine);
    hmac.update(accessKey);

    const hash = hmac.digest('base64');

    return hash;
  }
}
