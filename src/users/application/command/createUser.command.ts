import { ICommand } from '@nestjs/cqrs';

export class CreateUserCommand implements ICommand {
  constructor(readonly mobileNumber: string, readonly authNumber: string) {}
}
