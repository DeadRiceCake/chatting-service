import { IsOptional, IsString } from 'class-validator';

export class ResponseBody<T> {
  @IsString()
  status!: string;

  @IsString()
  message!: string;

  @IsOptional()
  additionalInfo?: T;

  constructor(status: string, message: string, additionalInfo?: T) {
    this.status = status;
    this.message = message;
    if (additionalInfo) this.additionalInfo = additionalInfo;
  }
}
