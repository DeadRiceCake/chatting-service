import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetUserQuery } from './getUser.Query';
import { AbstractUserRepository } from 'src/users/domain/repository/abstractUser.reporitory';
import { NotFoundException } from '@nestjs/common';
import { UserInfo } from 'src/users/interface/model/userInfo.model';

@QueryHandler(GetUserQuery)
export class GetUserQueryHandler implements IQueryHandler<GetUserQuery> {
  constructor(private usersRepository: AbstractUserRepository) {}

  async execute(query: GetUserQuery): Promise<UserInfo> {
    const { userId } = query;

    const user = await this.usersRepository.findOneByUserId(userId);

    if (!user) {
      throw new NotFoundException('유저가 존재하지 않습니다');
    }

    return {
      id: user.getId(),
      nickname: user.getNickname(),
      ratingScore: user.getRatingScore(),
    };
  }
}
