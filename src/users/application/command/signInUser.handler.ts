import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Injectable } from '@nestjs/common';
import { AuthService } from 'src/auth/application/auth.service';
import { SignInUserCommand } from './signInUser.command';

@Injectable()
@CommandHandler(SignInUserCommand)
export class SignInUserHandler implements ICommandHandler<SignInUserCommand> {
  constructor(private authService: AuthService) {}

  async execute(command: SignInUserCommand): Promise<void> {
    const { mobileNumber } = command;

    await this.authService.sendAuthSMS(mobileNumber);
  }
}
