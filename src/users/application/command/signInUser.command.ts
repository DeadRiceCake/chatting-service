import { ICommand } from '@nestjs/cqrs';

export class SignInUserCommand implements ICommand {
  constructor(readonly mobileNumber: string, readonly authNumber: string) {}
}
