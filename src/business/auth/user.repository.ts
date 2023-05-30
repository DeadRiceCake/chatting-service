import {
  Injectable,
  ConflictException,
  InternalServerErrorException,
} from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { User } from './user.entity';
import { AuthCredientialDto } from './dto/authCredential.dto';
import { ERROR_CODE } from 'src/common/constant/errorCode.constants';

@Injectable()
export class UserRepository extends Repository<User> {
  constructor(private dataSource: DataSource) {
    super(User, dataSource.createEntityManager());
  }

  public async createUser(
    AuthCredientialDto: AuthCredientialDto,
  ): Promise<void> {
    const { userName, password } = AuthCredientialDto;
    const user = this.create({ userName, password });

    try {
      await this.save(user);
    } catch (error) {
      if (error.code === ERROR_CODE.DB.DUPLICATE_ENTRY) {
        throw new ConflictException('Username already exists');
      } else {
        throw new InternalServerErrorException();
      }
    }
  }
}
