import { ICommand } from '@nestjs/cqrs';

export class VerifyAuthSMSCommand implements ICommand {
  constructor(readonly mobileNumber: string, readonly authNumber: string) {}
}
