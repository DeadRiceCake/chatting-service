import { IsOptional, IsString } from 'class-validator';

export class ResponseBody<T> {
  @IsString()
  status!: string;

  @IsString()
  message!: string;

  @IsOptional()
  data?: T;

  constructor(status: string, message: string, data?: T) {
    this.status = status;
    this.message = message;
    if (data) this.data = data;
  }
}
