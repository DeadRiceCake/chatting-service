import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SMSModule } from 'src/SMS/SMS.module';

@Module({
  imports: [SMSModule],
  providers: [AuthService],
  exports: [AuthService],
})
export class AuthModule {}
