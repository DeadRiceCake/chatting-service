import { BadRequestException } from '@nestjs/common';
import { ExceptionBody } from './exceptionBody.interface';

export class CustomBadRequestException extends BadRequestException {
  constructor(code: string, message: string, data?: unknown) {
    const exceptionBody: ExceptionBody = { code, message, data };

    super(exceptionBody);
  }
}
