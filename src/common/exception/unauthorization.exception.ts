import { UnauthorizedException } from '@nestjs/common';
import { ExceptionBody } from './exceptionBody.interface';

export class CustomUnauthorizedException extends UnauthorizedException {
  constructor(code: string, message: string, data?: unknown) {
    const exceptionBody: ExceptionBody = { code, message, data };

    super(exceptionBody);
  }
}
