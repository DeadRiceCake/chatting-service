import { ApiProperty } from '@nestjs/swagger';
import { RESPONSE_CODE } from '../constant/responseCode.constants';

interface ResponseBodyOptions {
  code?: string;
  message?: string;
  data?: unknown;
}

export class ResponseBody {
  @ApiProperty()
  code: string;

  @ApiProperty()
  message?: string;

  @ApiProperty({ required: false })
  data?: unknown;

  constructor(responseBodyOptions?: ResponseBodyOptions) {
    this.code = responseBodyOptions?.code || RESPONSE_CODE.SUCCESS;
    this.message = responseBodyOptions?.message;
    this.data = responseBodyOptions?.data;
  }
}
