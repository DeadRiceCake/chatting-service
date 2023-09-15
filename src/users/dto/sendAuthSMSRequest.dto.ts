import { IsString } from 'class-validator';

export class SendAuthSMSRequest {
  @IsString()
  mobileNumber: string;
}
