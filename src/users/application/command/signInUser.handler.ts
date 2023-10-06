import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Injectable } from '@nestjs/common';
import { SignInUserCommand } from './signInUser.command';
import { AbstractAuthService } from '../adapter/abstractAuth.service';
import { ResponseBody } from 'src/common/class/responseBody.class';
import { AbstractUserRepository } from 'src/users/domain/repository/abstractUser.reporitory';
import { CustomBadRequestException } from 'src/common/exception/badRequest.exception';
import { ERROR_CODE } from 'src/common/constant/errorCode.constants';

@Injectable()
@CommandHandler(SignInUserCommand)
export class SignInUserHandler implements ICommandHandler<SignInUserCommand> {
  constructor(
    private authService: AbstractAuthService,
    private userRepository: AbstractUserRepository,
  ) {}

  async execute(command: SignInUserCommand) {
    const { mobileNumber, authNumber } = command;

    const user = await this.userRepository.findOneByMobileNumber(mobileNumber);

    if (!user) {
      throw new CustomBadRequestException(
        ERROR_CODE.USER.NOT_FOUND,
        '존재하지 않는 사용자입니다.',
      );
    }

    const { refreshToken, accessToken } = await this.authService.signIn(
      user.getId(),
      'user',
      mobileNumber,
      authNumber,
    );

    return new ResponseBody({ data: { refreshToken, accessToken } });
  }
}
