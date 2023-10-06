import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateUserCommand } from './createUser.command';
import { UserFactory } from 'src/users/domain/user.factory';
import { Injectable } from '@nestjs/common';
import { randomUUID } from 'crypto';
import { AbstractUserRepository } from 'src/users/domain/repository/abstractUser.reporitory';
import { AbstractAuthService } from '../adapter/abstractAuth.service';
import { ResponseBody } from 'src/common/class/responseBody.class';
import { CustomConflictException } from 'src/common/exception/conflict.exception';
import { ERROR_CODE } from 'src/common/constant/errorCode.constants';

@Injectable()
@CommandHandler(CreateUserCommand)
export class CreateUserHandler implements ICommandHandler<CreateUserCommand> {
  constructor(
    private userFactory: UserFactory,
    private userRepository: AbstractUserRepository,
    private authService: AbstractAuthService,
  ) {}

  async execute(command: CreateUserCommand) {
    const { mobileNumber, authNumber } = command;

    await this.checkDuplicateUser(mobileNumber);

    const id = randomUUID();
    const nickname = `user_${id.split('-')[0]}`;

    await this.userRepository.saveUser(id, mobileNumber, nickname);

    const user = this.userFactory.create(id, mobileNumber, nickname);

    const { accessToken, refreshToken } = await this.authService.signIn(
      user.getId(),
      'user',
      mobileNumber,
      authNumber,
    );

    return new ResponseBody({ data: { user, accessToken, refreshToken } });
  }

  private async checkDuplicateUser(mobileNumber: string) {
    const existUser = await this.userRepository.findOneByMobileNumber(
      mobileNumber,
    );

    if (existUser) {
      throw new CustomConflictException(
        ERROR_CODE.USER.DUPLICATE_MOBILE_NUMBER,
        '이미 가입된 핸드폰 번호입니다.',
      );
    }
  }
}
