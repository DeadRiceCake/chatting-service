import { User } from '../user';

export abstract class AbstractUserRepository {
  saveUser: (
    id: string,
    mobileNumber: string,
    nickname: string,
  ) => Promise<void>;

  findOneByMobileNumber: (mobileNumber: string) => Promise<User | null>;
  findOneByUserId: (userId: string) => Promise<User | null>;
}
