import { ICommand } from '@nestjs/cqrs';

export class SendAuthSMSCommand implements ICommand {
  constructor(readonly mobileNumber: string) {}
}
