import { ApiProperty } from '@nestjs/swagger';

export class ResponseBody {
  @ApiProperty()
  message: string;

  @ApiProperty({ required: false })
  data?: object;

  constructor(message: string, data?: object) {
    this.message = message;
    this.data = data;
  }
}
