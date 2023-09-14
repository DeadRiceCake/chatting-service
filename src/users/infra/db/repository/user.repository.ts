import { DataSource, Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { User } from '../entity/user.entity';
import { AbstractUserRepository } from 'src/users/domain/repository/abstractUser.reporitory';

@Injectable()
export class UserRepository
  extends Repository<User>
  implements AbstractUserRepository
{
  constructor(private dataSource: DataSource) {
    super(User, dataSource.createEntityManager());
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
}
