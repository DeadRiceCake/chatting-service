import { ApiProperty } from '@nestjs/swagger';

export class ResponseBody {
  @ApiProperty()
  message: string;

  @ApiProperty({ required: false })
  data?: unknown;

  constructor(message: string, data?: unknown) {
    this.message = message;
    this.data = data;
  }
}
