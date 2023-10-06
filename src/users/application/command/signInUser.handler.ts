import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Injectable } from '@nestjs/common';
import { SignInUserCommand } from './signInUser.command';
import { AbstractAuthService } from '../adapter/abstractAuth.service';
import { ResponseBody } from 'src/common/class/responseBody.class';

@Injectable()
@CommandHandler(SignInUserCommand)
export class SignInUserHandler implements ICommandHandler<SignInUserCommand> {
  constructor(private authService: AbstractAuthService) {}

  async execute(command: SignInUserCommand) {
    const { mobileNumber, authNumber } = command;

    await this.authService.checkAuthMobileNumber(mobileNumber, authNumber);

    const { refreshToken, accessToken } = await this.authService.signIn(
      mobileNumber,
      'user',
    );

    return new ResponseBody({ data: { refreshToken, accessToken } });
  }
}
