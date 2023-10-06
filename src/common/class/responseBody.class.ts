import { ApiProperty } from '@nestjs/swagger';
import { RESPONSE_CODE } from '../constant/responseCode.constants';

interface ResponseBodyOptions {
  code?: string;
  data?: unknown;
}

export class ResponseBody {
  @ApiProperty()
  code: string;

  @ApiProperty({ required: false })
  data?: unknown;

  constructor(responseBodyOptions?: ResponseBodyOptions) {
    this.code = responseBodyOptions?.code || RESPONSE_CODE.SUCCESS;
    this.data = responseBodyOptions?.data;
  }
}
