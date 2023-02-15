import { IsOptional, IsString } from 'class-validator';

export class ResponseBody<T> {
  @IsString()
  status!: string;

  @IsString()
  message!: string;

  @IsOptional()
  additional_info?: T;

  constructor(status: string, message: string, additional_info?: T) {
    this.status = status;
    this.message = message;
    if (additional_info) this.additional_info = additional_info;
  }
}
