import { Module } from '@nestjs/common';
import { SMSService } from './SMS.service';

@Module({
  providers: [SMSService],
  exports: [SMSService],
})
export class SMSModule {}
