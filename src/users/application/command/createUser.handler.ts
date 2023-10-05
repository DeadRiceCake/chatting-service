import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateUserCommand } from './createUser.command';
import { UserFactory } from 'src/users/domain/user.factory';
import { Injectable, ConflictException } from '@nestjs/common';
import { randomUUID } from 'crypto';
import { AbstractUserRepository } from 'src/users/domain/repository/abstractUser.reporitory';
import { AbstractAuthService } from '../adapter/abstractAuth.service';

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

    await this.authService.checkAuthMobileNumber(mobileNumber, authNumber);

    const id = randomUUID();
    const nickname = `user_${id.split('-')[0]}`;

    await this.userRepository.saveUser(id, mobileNumber, nickname);

    const user = this.userFactory.create(id, mobileNumber, nickname);

    const { accessToken, refreshToken } = await this.authService.signIn(
      user.getId(),
      'user',
    );

    return { user, accessToken, refreshToken };
  }

  private async checkDuplicateUser(mobileNumber: string) {
    const existUser = await this.userRepository.findOneByMobileNumber(
      mobileNumber,
    );

    if (existUser) {
      throw new ConflictException('이미 존재하는 사용자입니다.');
    }
  }
}
