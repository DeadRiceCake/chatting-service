import { Module } from '@nestjs/common';
import { AuthService } from './application/auth.service';
import { SMSModule } from 'src/SMS/SMS.module';
import { AbstractSMSService } from './application/adapter/abstractSMS.service';
import { SMSService } from './infra/adapter/SMS.service';

const adapters = [{ provide: AbstractSMSService, useClass: SMSService }];

@Module({
  imports: [SMSModule],
  providers: [AuthService, ...adapters],
  exports: [AuthService],
})
export class AuthModule {}
