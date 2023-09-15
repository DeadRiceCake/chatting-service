import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateUserCommand } from './createUser.command';
import { UserFactory } from 'src/users/domain/user.factory';
import { BadRequestException, Injectable } from '@nestjs/common';
import { randomUUID } from 'crypto';
import { AbstractUserRepository } from 'src/users/domain/repository/abstractUser.reporitory';
import { AbstractCacheService } from '../adapter/abstractCache.service';

@Injectable()
@CommandHandler(CreateUserCommand)
export class CreateUserHandler implements ICommandHandler<CreateUserCommand> {
  constructor(
    private userFactory: UserFactory,
    private userRepository: AbstractUserRepository,
    private cacheService: AbstractCacheService,
  ) {}

  async execute(command: CreateUserCommand) {
    const { mobileNumber, nickname } = command;

    const isVerified = await this.cacheService.getAuthMobileNumberVerified(
      mobileNumber,
    );

    if (!isVerified) {
      throw new BadRequestException('핸드폰번호 인증이 완료되지 않았습니다.');
    } else {
      await this.cacheService.deleteAuthMobileNumberVerified(mobileNumber);
    }

    const id = randomUUID();

    await this.userRepository.saveUser(id, mobileNumber, nickname);

    const user = this.userFactory.create(id, mobileNumber, nickname);

    return user;
  }
}
