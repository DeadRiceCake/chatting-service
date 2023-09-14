import { Injectable } from '@nestjs/common';
import { AbstractSMSService } from 'src/auth/application/adapter/abstractSMS.service';
import { SMSService as ExternalSMSService } from 'src/SMS/SMS.service';

@Injectable()
export class SMSService implements AbstractSMSService {
  constructor(private smsService: ExternalSMSService) {}

  async sendAuthSMS(mobileNumber: string, authNumber: string): Promise<void> {
    return await this.smsService.sendAuthSMS(mobileNumber, authNumber);
  }
}
