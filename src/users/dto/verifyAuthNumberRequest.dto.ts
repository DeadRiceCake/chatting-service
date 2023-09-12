import { IsString } from 'class-validator';

export class VerifyAuthNumberRequest {
  @IsString()
  mobileNumber: string;

  @IsString()
  authNumber: string;
}
