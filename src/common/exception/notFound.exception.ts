import { NotFoundException } from '@nestjs/common';
import { ExceptionBody } from './exceptionBody.interface';

export class CustomNotFoundException extends NotFoundException {
  constructor(code: string, message: string, data?: unknown) {
    const exceptionBody: ExceptionBody = { code, message, data };

    super(exceptionBody);
  }
}
