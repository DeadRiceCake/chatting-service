import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateUserCommand } from './createUser.command';
import { UserFactory } from 'src/users/domain/user.factory';
import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { getAuthMobileNumberVerifiedKey } from 'src/utils/redis/getKey';
import { Cache } from 'cache-manager';
import { UserRepository } from 'src/users/infra/db/repository/user.repository';
import * as crypto from 'crypto';

@Injectable()
@CommandHandler(CreateUserCommand)
export class CreateUserHandler implements ICommandHandler<CreateUserCommand> {
  constructor(
    private userFactory: UserFactory,
    private userRepository: UserRepository,
    @Inject(CACHE_MANAGER) private RedisManager: Cache,
  ) {}

  async execute(command: CreateUserCommand) {
    const { mobileNumber, nickname } = command;

    const authNumberVerifiedKey = getAuthMobileNumberVerifiedKey(mobileNumber);
    const isVerified = await this.RedisManager.get(authNumberVerifiedKey);

    if (!isVerified) {
      throw new BadRequestException('핸드폰번호 인증이 완료되지 않았습니다.');
    } else {
      await this.RedisManager.del(authNumberVerifiedKey);
    }

    const id = crypto.randomUUID();

    await this.userRepository.save({
      id,
      mobile_number: mobileNumber,
      nickname,
    });

    const user = this.userFactory.create(id, mobileNumber, nickname);

    return user;
  }
}
