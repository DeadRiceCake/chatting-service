import { IsOptional, IsString } from 'class-validator';
import { RESPONSE_DESCRIPTION } from '../../config/Description';
import { RESPONSE_STATUS } from '../../config/Status';

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

export class InternalServerErrorResponse extends ResponseBody<string> {
  constructor(additionalInfo: string) {
    super(RESPONSE_STATUS.SERVER_ERROR.INTERNAL, RESPONSE_DESCRIPTION.SERVER_ERROR.INTERNAL_ERROR);
    this.additionalInfo = additionalInfo;
  }
}
