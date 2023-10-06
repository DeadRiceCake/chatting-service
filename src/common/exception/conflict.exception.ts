import { ConflictException } from '@nestjs/common';
import { ExceptionBody } from './exceptionBody.interface';

export class CustomConflictException extends ConflictException {
  constructor(code: string, message: string, data?: unknown) {
    const exceptionBody: ExceptionBody = { code, message, data };

    super(exceptionBody);
  }
}
