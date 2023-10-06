import { InternalServerErrorException } from '@nestjs/common';
import { ExceptionBody } from './exceptionBody.interface';

export class CustomInternalServerErrorException extends InternalServerErrorException {
  constructor(code: string, message: string, data?: unknown) {
    const exceptionBody: ExceptionBody = { code, message, data };

    super(exceptionBody);
  }
}
