import { IsString } from 'class-validator';

export class SignUpRequest {
  @IsString()
  mobileNumber: string;

  @IsString()
  authNumber: string;
}
