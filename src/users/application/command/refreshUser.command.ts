import { ICommand } from '@nestjs/cqrs';

export class RefreshUserCommand implements ICommand {
  constructor(readonly refreshToken: string) {}
}
