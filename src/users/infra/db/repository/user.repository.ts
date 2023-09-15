import { DataSource, Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { User as UserEntity } from '../entity/user.entity';
import { AbstractUserRepository } from 'src/users/domain/repository/abstractUser.reporitory';
import { User } from 'src/users/domain/user';
import { UserFactory } from 'src/users/domain/user.factory';

@Injectable()
export class UserRepository
  extends Repository<UserEntity>
  implements AbstractUserRepository
{
  constructor(
    private dataSource: DataSource,
    private userFactory: UserFactory,
  ) {
    super(UserEntity, dataSource.createEntityManager());
  }

  async saveUser(
    id: string,
    mobileNumber: string,
    nickname: string,
  ): Promise<void> {
    await this.save({
      id,
      mobile_number: mobileNumber,
      nickname,
    });
  }

  async findOneByMobileNumber(mobileNumber: string): Promise<User | null> {
    const userEntity = await this.findOne({
      where: {
        mobile_number: mobileNumber,
      },
    });

    if (!userEntity) {
      return null;
    }

    const {
      id,
      mobile_number,
      is_activated,
      role,
      nickname,
      rating_score,
      created_at,
    } = userEntity;

    return this.userFactory.reconstitute(
      id,
      mobile_number,
      is_activated,
      role,
      nickname,
      rating_score,
      created_at,
    );
  }

  async findOneByUserId(id: string): Promise<User | null> {
    const userEntity = await this.findOne({
      where: {
        id,
      },
    });

    if (!userEntity) {
      return null;
    }

    const {
      mobile_number,
      is_activated,
      role,
      nickname,
      rating_score,
      created_at,
    } = userEntity;

    return this.userFactory.reconstitute(
      id,
      mobile_number,
      is_activated,
      role,
      nickname,
      rating_score,
      created_at,
    );
  }
}
