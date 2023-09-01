import { Injectable } from '@nestjs/common';
import axios from 'axios';
import crypto from 'crypto';
import { ncpConfig } from 'src/config/ncp.config';
import { MessageBody, SendSMSBody } from './SMS.type';

@Injectable()
export class SMSService {
  private readonly baseUrl = ncpConfig.sms.BASE_URL;
  private readonly serviceId = ncpConfig.sms.SERVICE_ID;
  private readonly accessKey = ncpConfig.ACCESS_KEY;
  private readonly fromMobileNumber = ncpConfig.sms.FROM_MOBILE_NUMBER;

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

    const sendSMSResponse = await axios.post(
      `${this.baseUrl}${uri}`,
      requestBody,
      { headers },
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
