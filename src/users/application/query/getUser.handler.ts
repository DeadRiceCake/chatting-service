import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetUserQuery } from './getUser.Query';
import { AbstractUserRepository } from 'src/users/domain/repository/abstractUser.reporitory';
import { UserInfo } from 'src/users/interface/model/userInfo.model';
import { CustomNotFoundException } from 'src/common/exception/notFound.exception';
import { ERROR_CODE } from 'src/common/constant/errorCode.constants';

@QueryHandler(GetUserQuery)
export class GetUserQueryHandler implements IQueryHandler<GetUserQuery> {
  constructor(private usersRepository: AbstractUserRepository) {}

  async execute(query: GetUserQuery): Promise<UserInfo> {
    const { userId } = query;

    const user = await this.usersRepository.findOneByUserId(userId);

    if (!user) {
      throw new CustomNotFoundException(
        ERROR_CODE.USER.NOT_FOUND,
        '유저가 존재하지 않습니다',
      );
    }

    return {
      id: user.getId(),
      nickname: user.getNickname(),
      ratingScore: user.getRatingScore(),
    };
  }
}
