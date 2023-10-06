import { IsString } from 'class-validator';

export class RefreshUserRequest {
  @IsString()
  refreshToken: string;
}
