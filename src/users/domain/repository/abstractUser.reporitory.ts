export abstract class AbstractUserRepository {
  saveUser: (
    id: string,
    mobileNumber: string,
    nickname: string,
  ) => Promise<void>;
}
