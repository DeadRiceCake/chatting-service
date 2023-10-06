import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Injectable } from '@nestjs/common';
import { SignInUserCommand } from './signInUser.command';
import { AbstractAuthService } from '../adapter/abstractAuth.service';

@Injectable()
@CommandHandler(SignInUserCommand)
export class SignInUserHandler implements ICommandHandler<SignInUserCommand> {
  constructor(private authService: AbstractAuthService) {}

  async execute(command: SignInUserCommand) {
    const { mobileNumber, authNumber } = command;

    await this.authService.checkAuthMobileNumber(mobileNumber, authNumber);

    return await this.authService.signIn(mobileNumber, 'user');
  }
}
