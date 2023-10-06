import { Role } from 'src/auth/interface/model/role.model';

export abstract class AbstractAuthService {
  abstract signIn(
    userId: string,
    role: Role,
    mobileNumber: string,
    authNumber: string,
  ): Promise<{ refreshToken: string; accessToken: string }>;

  abstract sendAuthSMS(mobileNumber: string): Promise<void>;

  abstract refresh(refreshToken: string): Promise<string>;
}
